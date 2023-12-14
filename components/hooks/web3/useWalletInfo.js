import { useHooks } from "@components/providers/web3/web3";
import { useAccount } from "./useAccount";
import { useNetwork } from "./useNetwork";

export const useWalletInfo = () => {
    const {account} = useAccount()
    const {network} = useNetwork()

    const canPurchaseCourse = !!(account.data && network.data)
    return {
        account,
        network,
        canPurchaseCourse
    }
}