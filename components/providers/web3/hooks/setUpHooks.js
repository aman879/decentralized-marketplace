import { handler as createUseAccount } from "./useAccounts";

export const setUpHooks = web3 => {
    return {
        useAccount: createUseAccount(web3)
    }
}