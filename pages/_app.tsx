import * as React from "react"
import { AppProps } from "next/app"

const Website = ({ Component, pageProps, router }: AppProps) => {
  return <Component {...pageProps} key={router.route} />
}

export default Website
