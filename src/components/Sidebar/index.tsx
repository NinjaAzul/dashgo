import { Box, Drawer, DrawerHeader, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {

  const { isOpen, onClose } = useSidebarDrawer();

  const isFloatingSideBar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isFloatingSideBar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800">
            <DrawerCloseButton mt="6" p="4" />
            <DrawerHeader>Navageção</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  };


  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}