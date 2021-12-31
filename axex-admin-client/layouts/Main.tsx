import React from "react"
import Head from "next/head"
import { Box, Container } from "@chakra-ui/layout"
import { Router } from "next/dist/client/router"

type MainProps = {
  router: Router
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Andres Aguirre - Homepage</title>
      </Head>
      <Container maxW="container.md" pt={14}>
        {children}
      </Container>
    </Box>
  )
}

export default Main
