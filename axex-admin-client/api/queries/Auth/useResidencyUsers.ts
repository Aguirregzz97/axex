import axios from "axios"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type ResidencyUsersOutput = {
  residentsCount: number
}

const useResidencyUsers = (residency: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["residents", residency], async () => {
    const { data } = await axios.get<ResidencyUsersOutput>(
      "/api/user/get/residency-users/count",
      {
        params: { residency },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    return data.residentsCount
  })
}

export default useResidencyUsers
