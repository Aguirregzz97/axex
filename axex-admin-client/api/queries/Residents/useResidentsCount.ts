import axios from "axios"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type ResidentsCountOutput = {
  residentsCount: number
}

const useResidentsCount = (residency: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["residents-count", residency], async () => {
    const { data } = await axios.get<ResidentsCountOutput>(
      "/api/user/get/residency-users/count",
      {
        params: { residency },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    return data.residentsCount
  })
}

export default useResidentsCount
