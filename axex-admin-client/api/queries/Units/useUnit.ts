import axios from "axios"
import { IUnit } from "../../../../src/interfaces/unit"
import userHelper from "../../../helpers/userHelper"
import useCustomQuery from "../../../hooks/useCustomQuery"

type UnitOutput = {
  unit: IUnit
}

const useUnit = (id: string) => {
  const accessToken = userHelper.getUserResidency()

  return useCustomQuery(["Unit", id], async () => {
    const { data } = await axios.get<UnitOutput>("/api/unit/get/unit", {
      params: { id },
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    return data.unit
  })
}

export default useUnit
