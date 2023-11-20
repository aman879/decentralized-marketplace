import { handler as createUseAccount } from "./useAccounts";
import { handler as createNetwork } from "./useNetwork";

export const setUpHooks = web3 => {
    return {
        useAccount: createUseAccount(web3),
        useNetwork: createNetwork(web3)
    }
}