import React from "react"
import { RiUser3Fill } from "react-icons/ri"
import Icon from "@chakra-ui/icon"
import { Box, Heading } from "@chakra-ui/layout"
import { Button } from "@chakra-ui/button"
import { useToast } from "@chakra-ui/toast"
import Router from "next/router"
import { useUser } from "../../../contexts/UserContext"
import Header from "../../Header"
import Nav from "../../Nav/Nav"
import AnimatedSection from "../../AnimatedSection"
import AxexListItem from "../../AxexListItem"
import useLogout from "../../../api/mutations/Auth/useLogout"

const Profile: React.FC = () => {
  const [user, userHandlers] = useUser()
  const { mutateAsync: logoutUser, isLoading } = useLogout()
  const toast = useToast()

  const onLogoutPressed = async () => {
    if (!user) {
      return
    }
    try {
      await logoutUser({ refreshToken: user?.refreshToken || "" })
      userHandlers?.clear()
      Router.push("/login")
      toast({
        title: "Success",
        description: "Successfuly logged out",
        status: "success",
        duration: 4000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Profile"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiUser3Fill} w={6} h={6} />}
        />
      </AnimatedSection>
      <Box p="25px">
        <AnimatedSection delay={0.3}>
          <Heading mb="20px" as="h1" fontSize="26px" color="#1e6e7d">
            Actions
          </Heading>
          <AxexListItem
            title="Logout"
            description="logout from application"
            content={
              <Button
                isLoading={isLoading}
                onClick={onLogoutPressed}
                colorScheme="pink"
              >
                logout
              </Button>
            }
          />
        </AnimatedSection>
      </Box>
    </Nav>
  )
}

export default Profile
