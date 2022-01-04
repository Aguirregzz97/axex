/* eslint-disable no-unused-vars */
import { Spinner } from "@chakra-ui/react"
import { ResponsiveBar } from "@nivo/bar"
import React from "react"
import { IArrival } from "../../../../src/interfaces/arrival"
import useResidencyMonthlyArrivals from "../../../api/queries/Arrivals/useResidencyMonthlyArrivals"
import { useUser } from "../../../contexts/UserContext"

const MonthlyArrivalsBarChart: React.FC = () => {
  const [user] = useUser()

  const { data: residencyMonthlyArrivals, isLoading } =
    useResidencyMonthlyArrivals(user?.residency || "")

  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" />
  }

  const colors = ["#1e3857", "#5e88b2", "#90acc8", "#c3d1df"]

  const getDayArrivals = (day: number) => {
    return residencyMonthlyArrivals?.filter((rma: any) => {
      const arrivalDay = new Date(rma.createdAt).getDate()
      return arrivalDay === day
    }).length
  }

  const generateBarData = () => {
    const d = []
    for (let i = 1; i <= 31; i += 1) {
      d.push({
        id: `${i}`,
        value: getDayArrivals(i),
      })
    }
    return d
  }

  const d = generateBarData() as any

  return (
    <ResponsiveBar
      data={d}
      colors={colors}
      margin={{ top: 20, right: 10, bottom: 42, left: 60 }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Day",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Num Of Arrivals",
        legendPosition: "middle",
        legendOffset: -40,
      }}
    />
  )
}

export default MonthlyArrivalsBarChart
