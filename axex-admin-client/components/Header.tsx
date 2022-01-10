import { Box, Text } from "@chakra-ui/layout"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import { RiMenuFill } from "react-icons/ri"
import { navItems } from "./Nav/Nav"

type HeaderProps = {
  name: string
  icon: ReactNode
}

const Header: React.FC<HeaderProps> = ({ name, icon }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      boxShadow="sm"
      display="flex"
      padding="16px 12px"
      border="1px solid #e0dee2"
      position="relative"
    >
      {icon}
      <Text>{name}</Text>
      <IconButton
        onClick={onOpen}
        display={{ base: "block", sm: "none" }}
        position="absolute"
        justifySelf="flex-end"
        colorScheme="teal"
        size="sm"
        aria-label="Previous Page"
        marginRight="18px"
        marginTop="11px"
        right="0"
        top="0"
        icon={<Icon as={RiMenuFill} color="#f6f6f6" w="5" h="5" />}
      />
      <Drawer size="xl" placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader color="#1e6e7d" borderBottomWidth="1px">
            Axex
          </DrawerHeader>
          <DrawerBody p="10px 0">
            {navItems.map((navItem) => {
              return (
                <Link key={navItem.name} href={navItem.link} passHref>
                  <a>
                    <Box
                      pl="30px"
                      as="button"
                      pb="5px"
                      pt="5px"
                      justifyContent="flex-start"
                      display="flex"
                      alignItems="center"
                      width="100%"
                      bg={
                        router.pathname.includes(navItem.name) ? "#1e3857" : ""
                      }
                    >
                      {navItem.icon}
                      <Text fontSize="17px" color="#1e6e7d">
                        {navItem.name}
                      </Text>
                    </Box>
                  </a>
                </Link>
              )
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Header
