const formatDateISO = (date) => {
    const newDate = new Date(date.replace(/-/g, '/').replace(/T.+/, ''));
    const year = newDate.getFullYear().toString()
    const month = (newDate.getMonth() + 1).toString()
    const day = newDate.getDate().toString()

    return `${year}-${month.length > 1 ? month : '0' + month}-${day.length > 1 ? day : '0' + day}`
}

export default formatDateISO