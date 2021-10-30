import { useState } from "react";
import {
  Text,
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  Checkbox,
  useBreakpointValue,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { RiAddFill, RiPencilFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";
import { useUsers, getUsers } from "../../hook/useUsers";
import { querytClient } from "../../services/queryClient";
import { api } from "../../services/api";

//Props IconLeft and IconRihgt exists on Button
export default function UserList() {
  const [page, setPage] = useState(1);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { data, isLoading, error, isFetching, refetch } = useUsers(page, {
    // initialData: users,
  });

  const handlePrefeshUser = async (userId: string) => {
    await querytClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, //10 minutos
      }
    );
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Úsurarios
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                title="Novo Usuário"
                cursor="pointer"
              >
                <Icon as={RiAddFill} fontSize="18" />
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th w={["100%", "auto", "auto"]}>Usuário</Th>
                    {isWideVersion && <Th w="100%">Data de cadastro</Th>}

                    <Th>Editar</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => (
                    <>
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>

                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() => handlePrefeshUser(user.id)}
                            >
                              <Text fontWeight="bold">{user.name}</Text>
                            </Link>

                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>

                        {isWideVersion && <Td>{user.createdAt}</Td>}

                        <Td>
                          <Button
                            as="a"
                            w={10}
                            h={10}
                            borderRadius={"50%"}
                            display="flex"
                            align="center"
                            justify="center"
                            colorScheme=""
                            title="Editar"
                            cursor="pointer"
                          >
                            <Icon
                              as={RiPencilFill}
                              color="white"
                              _hover={{ color: "purple.300" }}
                              fontSize="15"
                            />
                          </Button>
                        </Td>
                      </Tr>
                    </>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const data = await getUsers(1);

//   console.log(data);

//   return {
//     props: {
//       data,
//     },
//   };
// };
