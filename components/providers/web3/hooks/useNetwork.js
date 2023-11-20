import useSWR from "swr"

export const handler = web3 => () => {

    const swrRes = useSWR(() => 
        web3 ? "web3/network": null,
        async () => {
            const netId = web3.eth.net.getId()
            return netId
        }
    )
    const data = swrRes.data
    return {
        network: {
            data: data
        }
    }
}