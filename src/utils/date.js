export const toMonthNameShort = (monthNumber) => {
    const date = new Date()
    date.setMonth(monthNumber - 1)

    return date.toLocaleString('en-US', {
        month: 'short',
    })
}

export const toMonthNameLong = (monthNumber) => {
    const date = new Date()
    date.setMonth(monthNumber - 1)

    return date.toLocaleString('en-US', {
        month: 'long',
    })
}

function twoDigits(num) {
    return num.toString().padStart(2, '0')
}
function formatDate(date) {
    return (
        [date.getFullYear(), twoDigits(date.getMonth() + 1), twoDigits(date.getDate())].join('-') +
        'T' +
        [twoDigits(date.getHours()), twoDigits(date.getMinutes())].join(':')
    )
}

function getPreviousDateFormatted() {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 1)

    return formatDate(currentDate)
}

// Date
export const dateTime = formatDate(new Date())
export const currentDate = dateTime.slice(0, 10)
export const previousDate = getPreviousDateFormatted().slice(0, 10)

let date = new Date()

//firstday and lastday of current month
let fDay = new Date(date.getFullYear(), date.getMonth(), 2).toISOString()
let lDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString()
export const firstDay = fDay.slice(0, 10)
export const lastDay = lDay.slice(0, 10)

//firstday and lastday of previous month
let fDayPrev = new Date(date.getFullYear(), date.getMonth() - 1, 2).toISOString()
let lDayPrev = new Date(date.getFullYear(), date.getMonth() + 0, 1).toISOString()
export const firstDayPrevious = fDayPrev.slice(0, 10)
export const lastDayPrevious = lDayPrev.slice(0, 10)
