import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {

  return (
    <Flex
      align="center"
    >
      {showProfileData && <Box mr="4" textAling="right">
        <Text>Erick de Freitas</Text>
        <Text
          color="gray.300"
          fontSize="small">erick@gmail.com</Text>
      </Box>}

      <Avatar size="md" name="Erick de Freitas" src="https://avatars.githubusercontent.com/u/42255137?s=96&v=4" />
    </Flex>
  );
}