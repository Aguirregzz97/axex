import axios from "axios"
import IUser from "../../../../src/interfaces/user"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type ResidencyUsersOutput = {
  residencyUsers: IUser[]
}

const useResidencyUsers = (residency: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["residents", residency], async () => {
    const { data } = await axios.get<ResidencyUsersOutput>(
      "/api/user/get/residency-users",
      {
        params: { residency },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    return data.residencyUsers
  })
}

export default useResidencyUsers
