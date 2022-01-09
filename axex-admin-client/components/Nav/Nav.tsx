import React from "react"
import { Box, Text, VStack } from "@chakra-ui/layout"
import { AspectRatio, Icon } from "@chakra-ui/react"
import Image from "next/image"
import {
  RiDashboardFill,
  RiHome4Fill,
  RiTeamFill,
  RiExchangeDollarLine,
  RiUser3Fill,
} from "react-icons/ri"
import Link from "next/link"
import { useRouter } from "next/router"
import axexLogo from "../../assets/img/axex-logo-white.png"
import NavLayout from "../../layouts/NavLayout"

const navItems = [
  {
    name: "home",
    icon: <Icon mr="7px" color="#f6f6f6" as={RiDashboardFill} w={6} h={6} />,
    link: "/dashboard/home",
  },
  {
    name: "residents",
    icon: <Icon mr="7px" color="#f6f6f6" as={RiTeamFill} w={6} h={6} />,
    link: "/dashboard/residents",
  },
  {
    name: "payments",
    icon: (
      <Icon mr="7px" color="#f6f6f6" as={RiExchangeDollarLine} w={6} h={6} />
    ),
    link: "/dashboard/payments",
  },
  {
    name: "units",
    icon: <Icon mr="7px" color="#f6f6f6" as={RiHome4Fill} w={6} h={6} />,
    link: "/dashboard/units",
  },
]

const Nav: React.FC = ({ children }) => {
  const router = useRouter()
  return (
    <>
      <Box
        w="160px"
        height="100vh"
        position="fixed"
        top="0"
        left="0"
        bg=""
        bgGradient="linear(to-t, #5e88b2, #1e6e7d)"
      >
        <VStack justifyContent="center">
          <AspectRatio mb="30px" mt="27px" maxW="100px" ratio={0 / 0}>
            <Image src={axexLogo} />
          </AspectRatio>
        </VStack>
        <Box>
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
                    bg={router.pathname.includes(navItem.name) ? "#1e3857" : ""}
                    _hover={{ bg: "#1e3857" }}
                  >
                    {navItem.icon}
                    <Text fontSize="17px" color="#f6f6f6">
                      {navItem.name}
                    </Text>
                  </Box>
                </a>
              </Link>
            )
          })}
        </Box>
        <Box width="100%" position="absolute" bottom="0" mb="30px">
          <Link href="/dashboard/profile" passHref>
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
                bg={router.pathname === "/dashboard/profile" ? "#1e3857" : ""}
                _hover={{ bg: "#1e3857" }}
              >
                <Icon mr="7px" color="#f6f6f6" as={RiUser3Fill} w={6} h={6} />{" "}
                <Text fontSize="17px" color="#f6f6f6">
                  Profile
                </Text>
              </Box>
            </a>
          </Link>
        </Box>
      </Box>
      <NavLayout>{children}</NavLayout>
    </>
  )
}

export default Nav
