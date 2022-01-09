import axios from "axios"
import { IUnit } from "../../../../src/interfaces/unit"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type UserUnitOutput = {
  unit: IUnit[]
}

const useUserUnit = (user: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["userUnit", user], async () => {
    const { data } = await axios.get<UserUnitOutput>(
      "/api/unit/get/user-unit",
      {
        params: { user },
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    )
    return data.unit[0]
  })
}

export default useUserUnit
