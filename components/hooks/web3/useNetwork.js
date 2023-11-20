import { useHooks } from "@components/providers/web3/web3";

export const useNetwork = () => {
    return useHooks(hooks => hooks.useNetwork)()
}