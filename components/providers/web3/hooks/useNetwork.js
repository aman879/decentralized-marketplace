import { useEffect } from "react"
import useSWR from "swr"

const NETWORKS = {
    1: "Ethereum Main Network",
    59144: "Linea Main Network",
    5: "Goerli Test Network",
    11155111: "Sepolia Test Network",
    59140 : "Linea Goerli Test Network",
    1337: "Ganache"
}

export const handler = web3 => () => {

    const {mutate, data, error} = useSWR(() => 
        web3 ? "web3/network": null,
        async () => {
            const netId = await web3.eth.net.getId()
            return NETWORKS[netId.toString()]
        }
    )
    useEffect(() => {
        window.ethereum &&
        window.ethereum.on("chainChanged", netId => mutate(NETWORKS[netId]))
    }, [])
    return {
        network: {
            data: data,
            isLoaded: data || error,
            mutate: mutate
        }
    }
}