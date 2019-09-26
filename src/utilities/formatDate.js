// Format date to appear as :  20 September, 2019
const formatDate = (date) => {
    const newDate = new Date(date.replace(/-/g, '/').replace(/T.+/, ''));

    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ]

    const monthIndex = newDate.getMonth()

    if (newDate.getDate() === (new Date().getDate())) {
        return 'Today'
    } else {
        return `${newDate.getDate()} ${monthNames[monthIndex]}, ${newDate.getFullYear()}`
    }
}

export default formatDate