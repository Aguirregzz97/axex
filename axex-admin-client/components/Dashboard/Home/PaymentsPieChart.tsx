import React from "react"
import { Spinner } from "@chakra-ui/spinner"
import { ResponsivePie } from "@nivo/pie"
import useResidencyPaymentRequests from "../../../api/queries/PaymentRequests/useResidencyPaymentRequests"
import { useUser } from "../../../contexts/UserContext"
import { IPaymentRequest } from "../../../../src/interfaces/paymentRequest"

const PaymentsPieChart = () => {
  const [user] = useUser()

  const { data: residencyPaymentRequests, isLoading } =
    useResidencyPaymentRequests(user?.residency || "")

  if (isLoading) {
    return <Spinner position="absolute" top="50%" left="50%" />
  }

  const getPaymentRequestsPayed = (payementRequests: IPaymentRequest[]) => {
    return payementRequests.filter((pr) => {
      return pr.payed
    }).length
  }

  const getPaymentRequestsPending = (payementRequests: IPaymentRequest[]) => {
    return payementRequests.filter((pr) => {
      return !pr.payed && !pr.expired
    }).length
  }

  const getPaymentRequestsExpired = (payementRequests: IPaymentRequest[]) => {
    return payementRequests.filter((pr) => {
      return pr.expired
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

export default PaymentsPieChart
