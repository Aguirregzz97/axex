import axios from "axios"
import { IArrival } from "../../../../src/interfaces/arrival"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type ResidencyMonthlyArrivalsOutput = {
  residencyArrivals: IArrival[]
}

const useResidencyMonthlyArrivals = (residency: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["residencyMonthlyArrivals", residency], async () => {
    const { data } = await axios.get<ResidencyMonthlyArrivalsOutput>(
      "/api/arrival/get/residency-monthly-arrivals",
      {
        params: { residency },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    return data.residencyArrivals
  })
}

export default useResidencyMonthlyArrivals
