export const formatListened = (num: number): string => {
    const absNum = Math.abs(num)
    const suffixes = ['', 'K', 'M', 'B', 'T'] // You can extend this as needed for larger numbers

    if (absNum < 1000) {
        return num.toString()
    }

    const tier = Math.floor(Math.log10(absNum) / 3)

    const scaled = num / Math.pow(1000, tier)
    const formatted = scaled.toFixed(0)

    return `${formatted}${suffixes[tier]}`
}

export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
}

export const formatName = (firstName: string, lastName: string) => {
    let fullName = firstName + ' ' + lastName
    if (!firstName) fullName = lastName
    if (!lastName) fullName = firstName
    if (!fullName) fullName = 'User'
    return fullName
}
