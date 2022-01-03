import { Box, Text } from "@chakra-ui/layout"
import React, { ReactNode } from "react"

type HeaderProps = {
  name: string
  icon: ReactNode
}

const Header: React.FC<HeaderProps> = ({ name, icon }) => {
  return (
    <Box
      boxShadow="sm"
      display="flex"
      padding="16px 12px"
      border="1px solid #e0dee2"
    >
      {icon}
      <Text>{name}</Text>
    </Box>
  )
}

export default Header
