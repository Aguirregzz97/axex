const getUserResidency = (): string => {
  if (typeof window === "undefined") {
    return ""
  }
  const user = JSON.parse(localStorage.getItem("user") || "")
  const { accessToken } = user
  return accessToken
}

export default { getUserResidency }
