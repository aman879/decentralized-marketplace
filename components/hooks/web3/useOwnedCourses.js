import { useHooks } from "@components/providers/web3/web3"


export const useOwnedCourses = (...args) => {
    const swrRes = useHooks(hooks => hooks.useOwnedCourses)(...args)
    return {
        ownedCourses: swrRes
    }
}