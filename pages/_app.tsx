import React from "react"
import "../axex-admin-client/styles/globals.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider } from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import theme from "../axex-admin-client/lib/theme"
import Fonts from "../axex-admin-client/components/Fonts"
import Layout from "../axex-admin-client/layouts/Main"
import UserProvider from "../axex-admin-client/contexts/UserContext"

const Website = ({ Component, pageProps, router }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
  })
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Layout router={router}>
            <AnimatePresence exitBeforeEnter initial={true}>
              <UserProvider>
                <Component {...pageProps} key={router.route} />
              </UserProvider>
            </AnimatePresence>
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

export default Website
