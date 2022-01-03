import React from "react"
import { Form, Formik } from "formik"
import Router from "next/router"
import Image from "next/image"
import { AspectRatio, Box, Button, Text, useToast } from "@chakra-ui/react"
import AxexBackground from "../AxexBackground"
import axexLogo from "../../assets/img/axex-logo-white.png"
import AnimatedSection from "../AnimatedSection"
import useLogin from "../../api/mutations/Auth/useLogin"
import LoginForm, {
  LoginFormInitial,
  LoginFormSchema,
  LoginFormType,
} from "../Forms/LoginForm"
import { useUser } from "../../contexts/UserContext"

const Login: React.FC = () => {
  const { mutateAsync: postLogin, isLoading } = useLogin()
  const toast = useToast()
  const [, handlers] = useUser()

  const onSubmitLoginForm = async (loginFormValues: LoginFormType) => {
    try {
      const response = await postLogin(loginFormValues)
      const { user } = response.data
      const { accessToken } = response.data
      const { refreshToken } = response.data
      user.accessToken = accessToken
      user.refreshToken = refreshToken
      toast({
        title: "Success",
        description: "Successfuly logged in",
        status: "success",
        duration: 4000,
        isClosable: true,
      })
      handlers?.init(user)
      Router.push("/")
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
    <AxexBackground>
      <AnimatedSection delay={0.2}>
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          h="100%"
          alignItems="center"
          pt="100px"
        >
          <AspectRatio maxW="175px" ratio={0 / 0}>
            <Image src={axexLogo} />
          </AspectRatio>
          <Box
            w={{ base: "294px", md: "428px" }}
            display="flex"
            flexDirection="column"
            borderRadius="8px"
            bg="#f6f6f6"
            mt="60px"
          >
            <Text
              mb="30px"
              alignSelf="center"
              mt="40px"
              fontSize="26px"
              color="#1e6e7d"
            >
              Login to your account
            </Text>
            <Box mb="40px" padding={{ base: "0 30px", md: "0 50px" }}>
              <Formik
                initialValues={LoginFormInitial}
                validationSchema={LoginFormSchema}
                onSubmit={onSubmitLoginForm}
              >
                {({ isValid, dirty }) => {
                  return (
                    <Form>
                      <LoginForm />
                      <Button
                        isLoading={isLoading}
                        disabled={!isValid || !dirty}
                        type="submit"
                        _active={{ bg: "", opacity: 0.95 }}
                        _hover={{ bg: "", opacity: 0.95 }}
                        width="100%"
                        bgGradient="linear(to-r, #1e6e7d, #5e88b2)"
                      >
                        Log In
                      </Button>
                    </Form>
                  )
                }}
              </Formik>
            </Box>

            <Box
              padding="20px 0px"
              display="flex"
              justifyContent="center"
              borderBottomRadius="8px"
              borderTop="1px solid #ddd"
              w="100%"
              bg="#e9e9e9"
            >
              <Text color="#4a5568">Forgot Your Password?</Text>
            </Box>
          </Box>
        </Box>
      </AnimatedSection>
    </AxexBackground>
  )
}

export default Login
