import { Box, Heading, Text } from "@chakra-ui/layout"
import React, { ReactNode } from "react"

type ListItemProps = {
  title: string
  description?: string
  content: ReactNode
}

const ListItem: React.FC<ListItemProps> = ({ title, description, content }) => {
  return (
    <Box
      borderTop="2px solid #e7ebf3"
      borderBottom="2px solid #e7ebf3"
      padding="40px 0px"
    >
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        maxWidth="700px"
        marginLeft="50px"
      >
        <Box>
          <Heading fontSize="22px" color="#1e6e7d" as="h3">
            {title}
          </Heading>
          {description && <Text>{description}</Text>}
        </Box>
        <Box>{content}</Box>
      </Box>
    </Box>
  )
}

export default ListItem
