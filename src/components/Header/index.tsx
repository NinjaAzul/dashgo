import { Flex, useBreakpointValue, IconButton,Icon } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { Logo } from "./Logo";
import { NotificationsNav } from "./NotificationsNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import {useSidebarDrawer} from "../../contexts/SidebarDrawerContext";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const {onToggle} = useSidebarDrawer();

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >

{!isWideVersion && <IconButton
 icon={<Icon as={RiMenuLine}/>} 
 fontSize="24" 
 variant="unstyled" 
 onClick={onToggle} 
 aria-label="Open navigation"
 mr="2"
 />}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex
        align="center"
        ml="auto"
      >

        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />

      </Flex>
    </Flex>
  )
}