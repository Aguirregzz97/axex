import axios from "axios"
import { IUnit } from "../../../../src/interfaces/unit"
import userHelper from "../../../helpers/userHelper"
import usePagination from "../../../hooks/usePagination"

const usePaginationResidencyUnits = (residency: string) => {
  const accessToken = userHelper.getUserResidency()

  return usePagination<IUnit>(
    (queryParams) => {
      return axios.get(
        `/api/unit/get/residency-units?residency=${residency}&${queryParams}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      )
    },
    ["paginationResidents", { queryParams: {} }],
  )
}

export default usePaginationResidencyUnits
