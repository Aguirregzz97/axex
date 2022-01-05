import React from "react"
import { RiTeamFill } from "react-icons/ri"
import Icon from "@chakra-ui/icon"
import { Box, Heading } from "@chakra-ui/react"
import Header from "../../Header"
import Nav from "../../Nav/Nav"
import AnimatedSection from "../../AnimatedSection"
import ResidentsTable from "./ResidentsTable"

const Residents: React.FC = () => {
  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Residents"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiTeamFill} w={6} h={6} />}
        />
      </AnimatedSection>
      <AnimatedSection>
        <Box p="25px">
          <Heading mb="20px" as="h1" fontSize="26px" color="#1e6e7d">
            Residents
          </Heading>
          <ResidentsTable />
        </Box>
      </AnimatedSection>
    </Nav>
  )
}

export default Residents
