import { Heading } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import { ResponsivePie } from "@nivo/pie"
import React from "react"
import useResidentsCount from "../../../api/queries/Residents/useResidentsCount"
import { useUser } from "../../../contexts/UserContext"

const NumberOfResidentsPieChart = () => {
  const [user] = useUser()

  const { data: residentsCount, isLoading } = useResidentsCount(
    user?.residency || "",
  )

  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" />
  }

  const d = [
    {
      id: "Residents",
      value: residentsCount,
    },
  ]

  const colors = ["#1e3857", "#5e88b2", "#90acc8", "#c3d1df"]

  if (residentsCount === 0) {
    return <Heading>No Residents :(</Heading>
  }

  return (
    <ResponsivePie
      data={d}
      colors={colors}
      margin={{ top: 20, right: 30, bottom: 40, left: 30 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor="#f6f6f6"
      arcLinkLabelsColor="black"
    />
  )
}

export default NumberOfResidentsPieChart
