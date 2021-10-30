import {
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Divider,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { querytClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { useRouter } from "next/router";

export default function CreateUser() {
  const router = useRouter();

  const createUserFormSchema = yup.object().shape({
    name: yup.string().required("o campo Nome é obrigatório"),
    email: yup
      .string()
      .email("o campo E-mail é invalido")
      .required("o campo E-mail é obrigatório"),
    password: yup
      .string()
      .required("o campo Senha é obrigatório")
      .min(6, "no minimo 6 caracteres"),
    password_confirmation: yup
      .string()
      .oneOf([null, yup.ref("password")], "as senhas não coincidem"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { isSubmitting, isSubmitSuccessful, errors } = formState;

  type CreateUserData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };

  const createUser = useMutation(
    async (user: CreateUserData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          create_at: new Date().toISOString(),
        },
      });
      return response.data.user;
    },
    {
      onSuccess: () => {
        querytClient.invalidateQueries("users");
      },
    }
  );

  const handleCreateUser: SubmitHandler<CreateUserData> = async (data) => {
    await createUser.mutateAsync(data);

    router.push("/users");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome Completo"
                {...register("name")}
                error={errors.name}
              />
              <Input
                name="email"
                label="E-mail"
                {...register("email")}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register("password")}
                error={errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da Senha"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify={["center", "flex-end"]}>
            <HStack w={["100%", "auto"]} spacing={["2", "4"]}>
              <Link href="/users" passHref>
                <Button w={["100%", "100%"]} colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                isLoading={isSubmitting}
                w={["100%", "100%"]}
                colorScheme="pink"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
