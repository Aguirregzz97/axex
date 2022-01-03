import axios from "axios"
import useCustomMutation from "../../../hooks/useCustomMutation"

type LogoutData = {
  refreshToken: string
}

const useLogout = () => {
  return useCustomMutation("deleteLogoutUser", (userLogoutData: LogoutData) => {
    return axios.delete("/api/user/delete/logout", { data: userLogoutData })
  })
}

export default useLogout
