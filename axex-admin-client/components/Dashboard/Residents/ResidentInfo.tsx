import React from "react"
import { RiTeamFill } from "react-icons/ri"
import { Icon } from "@chakra-ui/icons"
import { Box, Button, Heading, Spinner, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Nav from "../../Nav/Nav"
import AnimatedSection from "../../AnimatedSection"
import Header from "../../Header"
import useResident from "../../../api/queries/Residents/useResident"
import ListItem from "../../ListItem"
import useBlockUser from "../../../api/mutations/Resident/useBlockResident"

const ResidentInfo: React.FC = () => {
  const router = useRouter()

  const userId: string = router.query.id as string

  const {
    data: resident,
    isLoading: isLoadingResident,
    refetch,
  } = useResident(userId)

  const { mutateAsync: blockUser, isLoading: isBlocking } = useBlockUser(userId)

  const toast = useToast()

  const handleBlockUser = async (blockStatus: boolean) => {
    try {
      const response = await blockUser(blockStatus)
      toast({
        title: "Success",
        description: `Successfuly ${
          blockStatus ? "Blocked" : "UnBlocked"
        } User: ${response.data.blockedUser.firstName} ${
          response.data.blockedUser.lastName
        }`,
        status: "success",
        duration: 4000,
        isClosable: true,
      })
      refetch()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <Nav>
      <AnimatedSection>
        <Header
          name="Resident"
          icon={<Icon mr="7px" color="#1e6e7d" as={RiTeamFill} w={6} h={6} />}
        />
      </AnimatedSection>
      <Box p="25px">
        <AnimatedSection delay={0.3}>
          <Box position="relative">
            {isLoadingResident && (
              <Spinner position="absolute" top="50%" left="50%" size="lg" />
            )}
            <Heading mb="20px" as="h1" fontSize="26px" color="#1e6e7d">
              {resident?.firstName} {resident?.lastName}
            </Heading>
            <ListItem
              title={resident?.blocked ? "Blocked" : "Not Blocked"}
              description={`Resident currently ${
                resident?.blocked ? "blocked, unblock" : "not blocked, block"
              } resident from axex`}
              content={
                <Button
                  isLoading={isBlocking}
                  onClick={() => {
                    handleBlockUser(!resident?.blocked)
                  }}
                  colorScheme={resident?.blocked ? "green" : "pink"}
                >
                  {resident?.blocked ? "UnBlock" : "block"}
                </Button>
              }
            />
          </Box>
        </AnimatedSection>
      </Box>
    </Nav>
  )
}

export default ResidentInfo
