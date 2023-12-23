
const _isEmpty = data => {
    return (
        data == null ||
        data == "" ||
        (Array.isArray(data) && data.length === 0) ||
        (data.constructor === Object && Object.keys(data).length === 0 )
    )
}


export const enhanceHook = swrRes => {
    const {data} = swrRes
    const hasInitialResponse = !!(data)
    const isEmpty = hasInitialResponse && _isEmpty(data)
    return {
        ...swrRes,
        isEmpty,
        hasInitialResponse
    }
}