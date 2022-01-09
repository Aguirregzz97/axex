import axios from "axios"
import userHelper from "../../../helpers/userHelper"
import useCustomMutation from "../../../hooks/useCustomMutation"

const useBlockUser = (userId: string) => {
  const accessToken = userHelper.getUserResidency()

  const options = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  return useCustomMutation("blockUser", (blockStatus: boolean) => {
    return axios.put(
      "/api/user/put/user/block",
      { userId, blockStatus },
      options,
    )
  })
}

export default useBlockUser
