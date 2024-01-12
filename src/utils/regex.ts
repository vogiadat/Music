export const getSearch = (string: string) => {
    return (
        string
            .match(/search=+\w+/)
            ?.at(0)
            ?.split('=')
            ?.at(1) || ''
    )
}
