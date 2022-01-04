import React from "react"
import { Spinner } from "@chakra-ui/spinner"
import { ResponsivePie } from "@nivo/pie"
import { Heading } from "@chakra-ui/layout"
import useResidencyPaymentRequests from "../../../api/queries/PaymentRequests/useResidencyPaymentRequests"
import { useUser } from "../../../contexts/UserContext"
import { IPaymentRequest } from "../../../../src/interfaces/paymentRequest"

const ManualPaymentsPieChart = () => {
  const [user] = useUser()

  const { data: residencyPaymentRequests, isLoading } =
    useResidencyPaymentRequests(user?.residency || "")

  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" />
  }

  const getManualPaymentsCount = (payementRequests: IPaymentRequest[]) => {
    return payementRequests.filter((pr) => {
      return pr.type === "manual"
    }).length
  }

  const getPaymentRequestsPayed = (payementRequests: IPaymentRequest[]) => {
    return payementRequests.filter((pr) => {
      return pr.payed && pr.type === "manual"
    }).length
  }

  const getPaymentRequestsPending = (payementRequests: IPaymentRequest[]) => {
    return payementRequests.filter((pr) => {
      return !pr.payed && !pr.expired && pr.type === "manual"
    }).length
  }

  const getPaymentRequestsExpired = (payementRequests: IPaymentRequest[]) => {
    return payementRequests.filter((pr) => {
      return pr.expired && pr.type === "manual"
    }).length
  }

  const d = [
    {
      id: "Payed",
      value: getPaymentRequestsPayed(residencyPaymentRequests || []),
    },
    {
      id: "Pending",
      value: getPaymentRequestsPending(residencyPaymentRequests || []),
    },
    {
      id: "Expired",
      value: getPaymentRequestsExpired(residencyPaymentRequests || []),
    },
  ]

  const colors = ["#1e3857", "#5e88b2", "#90acc8", "#c3d1df"]

  if (getManualPaymentsCount(residencyPaymentRequests || []) === 0) {
    return (
      <Heading
        color="#1e6e7d"
        fontSize="35px"
        as="h1"
        textAlign="center"
        marginTop="30px"
      >
        No Manual Payments
      </Heading>
    )
  }

  return (
    <ResponsivePie
      data={d}
      colors={colors}
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
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

export default ManualPaymentsPieChart
