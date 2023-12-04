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
