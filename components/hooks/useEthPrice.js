import useSWR from "swr"

const URL = "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false"
const COURSE_PRICE = 1

export const useEthPrice =() => {

    const {data, ...rest} = useSWR(
        URL,
        async(url) => {
            const res = await fetch(url)
            const json = await res.json()
            return {
                inr: json.market_data.current_price.inr,
                usd: json.market_data.current_price.usd
            }
        },
        { refreshInterval: 10000}
    )

    const perItem = (data && (COURSE_PRICE / Number(data.usd))) ?? null
    return {
        eth: { data, perItem, ...rest}
    }
}