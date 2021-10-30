import { Flex, Button, Stack, FormLabel, FormControl } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export default function Home() {
  const signInFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("o campo E-mail é invalido")
      .required("o campo E-mail é obrigatório"),
    password: yup.string().required("o campo Senha é obrigatório"),
  });

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { isSubmitting, isSubmitSuccessful, errors } = formState;

  type SignInFormData = {
    email: string;
    password: string;
  };

  const handleSignIn: SubmitHandler<SignInFormData> = async (data, event) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2sig awaiting.

    if (isSubmitSuccessful) {
      alert("deu bom cuzão");
    }

    reset();

    console.log(data);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        onSubmit={handleSubmit(handleSignIn)}
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"
        //gridGap="2"
      >
        <Stack spacing="4">
          <FormControl>
            <FormLabel htmlFor="email">E-mail</FormLabel>

            <Input
              id="email"
              name="email"
              type="email"
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              _hover={{ gbColor: "gray.900" }}
              size="lg"
              error={errors.email}
              placeholder="E-mail"
              {...register("email")}
              // {...register("email", {required: "E-mail obrigatório!"})}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              _hover={{ gbColor: "gray.900" }}
              size="lg"
              placeholder="Senha"
              error={errors.password}
              {...register("password")}
            />
          </FormControl>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
