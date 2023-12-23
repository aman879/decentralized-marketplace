import { useHooks } from "@components/providers/web3/web3"
import { enhanceHook } from "./enhanceHook"

export const useOwnedCourses = (...args) => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useOwnedCourses)(...args))
    return {
        ownedCourses: swrRes
    }
}