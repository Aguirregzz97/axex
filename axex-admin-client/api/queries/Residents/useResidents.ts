import axios from "axios"
import IUser from "../../../../src/interfaces/user"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type ResisdentsOutput = {
  residencyUsers: IUser[]
}

const useResidents = (residency: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["residents"], async () => {
    const { data } = await axios.get<ResisdentsOutput>(
      "/api/user/get/residency-users",
      {
        params: { residency },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    return data.residencyUsers
  })
}

export default useResidents
