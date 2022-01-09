import axios from "axios"
import IUser from "../../../../src/interfaces/user"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type ResidentResponse = {
  user: IUser
}

const useResident = (userId: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["resident", userId], async () => {
    const { data } = await axios.get<ResidentResponse>("/api/user/get/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { userId },
    })
    return data.user
  })
}

export default useResident
