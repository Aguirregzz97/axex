import React from "react"
import { RiExchangeDollarLine } from "react-icons/ri"
import { Icon } from "@chakra-ui/react"
import Header from "../../Header"
import Nav from "../../Nav/Nav"
import AnimatedSection from "../../AnimatedSection"

const Payments: React.FC = () => {
  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Payments"
          icon={
            <Icon
              mr="7px"
              color="#1e6e7d"
              as={RiExchangeDollarLine}
              w={6}
              h={6}
            />
          }
        />
      </AnimatedSection>
    </Nav>
  )
}

export default Payments
