import axios from "axios"
import { IVisit } from "../../../../src/interfaces/visit"
import userHelper from "../../../helpers/userHelper"
import usePagination from "../../../hooks/usePagination"

const usePaginationResidentVisits = (userId: string) => {
  const accessToken = userHelper.getUserResidency()

  return usePagination<IVisit>(
    (queryParams) => {
      return axios.get(
        `/api/visit/get/user-visits?userId=${userId}&${queryParams}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      )
    },
    ["paginationResidents", { queryParams: {} }],
  )
}

export default usePaginationResidentVisits
