import { useHooks } from "@components/providers/web3/web3"
import { enhanceHook } from "./enhanceHook"


export const useManageCourses = (...args) => {
    const swrRes = useHooks(hooks => hooks.useManageCourses)(...args)

    return {
        manageCourses: swrRes
    }
}