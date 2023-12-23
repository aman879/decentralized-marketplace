import { useHooks } from "@components/providers/web3/web3";
import { enhanceHook } from "./enhanceHook";

export const useAccount = () => {
    return enhanceHook(useHooks(hooks => hooks.useAccount)())
}