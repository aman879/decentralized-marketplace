import { useHooks } from "@components/providers/web3/web3"


export const useOwnedCourse = (...args) => {
    const swrRes = useHooks(hooks => hooks.useOwnedCourse)(...args)

    return {
        ownedCourse: swrRes
    }
}