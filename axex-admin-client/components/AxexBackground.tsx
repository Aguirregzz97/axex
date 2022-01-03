import { Box } from "@chakra-ui/layout"
import React from "react"

const AxexBackground: React.FC = ({ children }) => {
  return (
    <Box bg="#1e6e7d" w="100%" h="100vh">
      {children}
    </Box>
  )
}

export default AxexBackground
