import axios from "axios"
import IUser from "../../../../src/interfaces/user"
import userHelper from "../../../helpers/userHelper"
import usePagination from "../../../hooks/usePagination"

const usePaginationResidents = (residency: string) => {
  const accessToken = userHelper.getUserResidency()

  return usePagination<IUser>(
    (queryParams) => {
      return axios.get(
        `/api/user/get/residency-users?residency=${residency}&${queryParams}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      )
    },
    ["paginationResidents", { queryParams: {} }],
  )
}

export default usePaginationResidents
