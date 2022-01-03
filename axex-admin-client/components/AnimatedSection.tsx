import React from "react"
import { chakra, shouldForwardProp } from "@chakra-ui/system"
import { motion } from "framer-motion"

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: (prop) => {
    return shouldForwardProp(prop) || prop === "transition"
  },
})

type SectionProps = {
  delay?: number
}

const AnimatedSection: React.FC<SectionProps> = ({ children, delay = 0 }) => {
  return (
    <StyledDiv
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: "0.8", delay: `${delay}` }}
    >
      {children}
    </StyledDiv>
  )
}

export default AnimatedSection
