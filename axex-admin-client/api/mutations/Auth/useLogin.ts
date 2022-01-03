import axios from "axios"
import { LoginFormType } from "../../../components/Forms/LoginForm"
import useCustomMutation from "../../../hooks/useCustomMutation"

const useLogin = () => {
  return useCustomMutation(
    "createLoginUser",
    (userLoginData: LoginFormType) => {
      return axios.post("/api/user/create/login/user", userLoginData)
    },
  )
}

export default useLogin
