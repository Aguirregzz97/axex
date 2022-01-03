import Icon from "@chakra-ui/icon"
import React from "react"
import { RiHome4Fill } from "react-icons/ri"
import AnimatedSection from "../../AnimatedSection"
import Header from "../../Header"
import Nav from "../../Nav/Nav"

const Units: React.FC = () => {
  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Units"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiHome4Fill} w={6} h={6} />}
        />
      </AnimatedSection>
    </Nav>
  )
}

export default Units
