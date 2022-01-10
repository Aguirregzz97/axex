import { Box } from "@chakra-ui/layout"
import React from "react"

const NavLayout: React.FC = ({ children }) => {
  return <Box ml={{ base: "none", sm: "160px" }}>{children}</Box>
}

export default NavLayout
