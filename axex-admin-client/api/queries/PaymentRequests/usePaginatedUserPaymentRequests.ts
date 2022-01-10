import axios from "axios"
import { IPayment } from "../../../../src/interfaces/payment"
import userHelper from "../../../helpers/userHelper"
import usePagination from "../../../hooks/usePagination"

const usePaginationUserPaymentRequests = (user: string) => {
  const accessToken = userHelper.getUserResidency()

  return usePagination<IPayment>(
    (queryParams) => {
      return axios.get(
        `/api/payment-request/get/user-payment-requests?user=${user}&${queryParams}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      )
    },
    ["paginationUserPaymentRequests", { queryParams: {} }],
  )
}

export default usePaginationUserPaymentRequests
