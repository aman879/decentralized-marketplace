import { useEffect } from "react"
import { useAccount } from "./useAccount"
import { useWeb3 } from "@components/providers"
import { useRouter } from "next/router"


export const useAdmin = ({redirectTo}) => {
    const { account } = useAccount()
    const { isWeb3Loaded } = useWeb3()
    const router = useRouter()
    
    useEffect(() => {
        if((account.data && !account.isAdmin)) {
            alert("Only Admin can use this")
            router.push(redirectTo)
        }
    }, [account])

    return { account }
}