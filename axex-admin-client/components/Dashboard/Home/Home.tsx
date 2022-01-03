import React from "react"
import { RiHome4Fill } from "react-icons/ri"
import { Icon, SimpleGrid } from "@chakra-ui/react"
import Header from "../../Header"
import Nav from "../../Nav/Nav"
import AnimatedSection from "../../AnimatedSection"
import GridElement from "../GridElement"
import NumberOfResidentsPieChart from "./NumberOfResidentsPieChart"

const Home: React.FC = () => {
  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Home"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiHome4Fill} w={6} h={6} />}
        />
      </AnimatedSection>
      <SimpleGrid padding="20px" spacing="20px" columns={{ sm: 2, md: 3 }}>
        <GridElement headerText="Number Of Residents">
          <NumberOfResidentsPieChart />
        </GridElement>
      </SimpleGrid>
    </Nav>
  )
}

export default Home
