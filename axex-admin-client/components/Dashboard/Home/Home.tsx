import React from "react"
import { RiHome4Fill } from "react-icons/ri"
import { Box, Icon } from "@chakra-ui/react"
import Header from "../../Header"
import Nav from "../../Nav/Nav"
import AnimatedSection from "../../AnimatedSection"
import HomeElement from "../HomeElement"
import NumberOfResidentsPieChart from "./NumberOfResidentsPieChart"
import PaymentsPieChart from "./PaymentsPieChart"

const Home: React.FC = () => {
  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Home"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiHome4Fill} w={6} h={6} />}
        />
      </AnimatedSection>
      <Box padding="30px" display="flex" gap="20px" flexWrap="wrap">
        <HomeElement headerText="Number Of Residents">
          <NumberOfResidentsPieChart />
        </HomeElement>
        <HomeElement headerText="Payments">
          <PaymentsPieChart />
        </HomeElement>
      </Box>
    </Nav>
  )
}

export default Home
