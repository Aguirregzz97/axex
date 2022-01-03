import React from "react"
import { RiHome4Fill } from "react-icons/ri"
import { Icon } from "@chakra-ui/react"
import Header from "../../Header"
import Nav from "../../Nav/Nav"
import AnimatedSection from "../../AnimatedSection"

const Home: React.FC = () => {
  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Home"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiHome4Fill} w={6} h={6} />}
        />
      </AnimatedSection>
    </Nav>
  )
}

export default Home