import React from "react"
import { Box, Text } from "@chakra-ui/layout"
import AnimatedSection from "../AnimatedSection"

type GridElementProps = {
  headerText: string
  width?: string
  height?: string
}

const HomeElement: React.FC<GridElementProps> = ({
  headerText,
  children,
  width = "350px",
  height = "250px",
}) => {
  return (
    <AnimatedSection>
      <Box
        borderRadius="5px"
        width={width}
        height={height}
        border="1px solid #e0dee2"
        boxShadow="md"
      >
        <Box
          boxShadow="sm"
          display="flex"
          alignItems="center"
          padding="12px 8px"
          border="1px solid #e0dee2"
        >
          <Text color="#1e6e7d">{headerText}</Text>
        </Box>
        <Box width="100%" height="calc(100% - 50px)" position="relative">
          {children}
        </Box>
      </Box>
    </AnimatedSection>
  )
}

export default HomeElement
