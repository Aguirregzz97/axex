import { Icon } from "@chakra-ui/icons"
import React from "react"
import { RiHome4Fill } from "react-icons/ri"
import UnitInfo from "../../../axex-admin-client/components/Dashboard/Units/UnitInfo"
import Header from "../../../axex-admin-client/components/Header"
import Nav from "../../../axex-admin-client/components/Nav/Nav"

const UnitInfoPage: React.FC = () => {
  return (
    <Nav>
      <Header
        name="Unit"
        icon={<Icon mr="7px" color="#1e6e7d" as={RiHome4Fill} w={6} h={6} />}
      />
      <UnitInfo />
    </Nav>
  )
}

export default UnitInfoPage
