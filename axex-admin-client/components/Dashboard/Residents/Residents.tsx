import React from "react"
import { RiTeamFill } from "react-icons/ri"
import Icon from "@chakra-ui/icon"
import Header from "../../Header"
import Nav from "../../Nav/Nav"
import AnimatedSection from "../../AnimatedSection"

const Residents: React.FC = () => {
  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Residents"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiTeamFill} w={6} h={6} />}
        />
      </AnimatedSection>
    </Nav>
  )
}

export default Residents
