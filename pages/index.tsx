import React, { useEffect } from "react"
import Router from "next/router"
import { useUser } from "../axex-admin-client/contexts/UserContext"

const Home: React.FC = () => {
  const [user] = useUser()
  useEffect(() => {
    const { pathname } = Router
    if (pathname === "/" && user === undefined) {
      Router.push("/login")
    }
    if (pathname === "/" && user !== undefined) {
      Router.push("/dashboard/home")
    }
  })
  return <></>
}

export default Home
