import Icon from "@chakra-ui/icon"
import { Box, Heading } from "@chakra-ui/react"
import React from "react"
import { RiHome4Fill } from "react-icons/ri"
import AnimatedSection from "../../AnimatedSection"
import Header from "../../Header"
import Nav from "../../Nav/Nav"
import ResidentsTable from "./UnitsTable"

const Units: React.FC = () => {
  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Units"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiHome4Fill} w={6} h={6} />}
        />
      </AnimatedSection>
      <AnimatedSection>
        <Box p="25px">
          <Heading mb="20px" as="h1" fontSize="26px" color="#1e6e7d">
            Units
          </Heading>
          <ResidentsTable />
        </Box>
      </AnimatedSection>
    </Nav>
  )
}

export default Units
