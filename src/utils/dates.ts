const hasExpired = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // compare only date and not hours
  return today > date
}

const dateUtils = { hasExpired }

export default dateUtils
