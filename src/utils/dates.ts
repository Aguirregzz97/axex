const hasExpired = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // compare only date and not hours
  return today > date
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dateUtils = { hasExpired, monthNames }

export default dateUtils
