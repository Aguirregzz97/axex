function getQueryParamsStr(params?: Record<string, any>) {
  if (!params) {
    return ""
  }

  return Object.entries(params)
    .filter(([, v]) => {
      if (v && Array.isArray(v)) {
        return v.length
      }
      return !!v
    })
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        return `${k}=${v.join(",")}`
      }
      return `${k}=${v}`
    })
    .join("&")
}

export default { getQueryParamsStr }
