const clearLocalStorage = () => {
  localStorage.removeItem("user")
  localStorage.removeItem("onboardingStatus")
  localStorage.removeItem("viewMode")
}

export default clearLocalStorage
