import { handler as createUseAccount } from "./useAccounts";
import { handler as createNetwork } from "./useNetwork";
import { handler as createOnwedCoursesHook} from "./useOwnedCourses";

export const setUpHooks = web3 => {
    return {
        useAccount: createUseAccount(web3),
        useNetwork: createNetwork(web3),
        useOwnedCourses: createOnwedCoursesHook(web3) 
    }
}