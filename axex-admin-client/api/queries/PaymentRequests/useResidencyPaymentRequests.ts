import axios from "axios"
import { IPaymentRequest } from "../../../../src/interfaces/paymentRequest"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type ResidencyPaymentRequestOutput = {
  paymentRequests: IPaymentRequest[]
}

const useResidencyPaymentRequests = (residency: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["residencyPaymentRequests", residency], async () => {
    const { data } = await axios.get<ResidencyPaymentRequestOutput>(
      "/api/payment-request/get/residency-payment-requests",
      {
        params: { residency },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    return data.paymentRequests
  })
}

export default useResidencyPaymentRequests
