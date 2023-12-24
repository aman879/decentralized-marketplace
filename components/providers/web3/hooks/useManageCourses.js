import { normalizeOwnedCourse } from "@utils/normalize"
import useSWR from "swr"


export const handler = web3 => (contract, account) => {
    const swrRes = useSWR(() => 
        web3 && contract && account.data && account.isAdmin ? `web3/manageCourses/${account.data}` : null,
        async () => {
            const courses  = []
            const courseCounnt = await contract.methods.getCourseCount().call()

            for(let i = Number(courseCounnt) - 1; i >= 0; i--) {
                const courseHash = await contract.methods.getCourseHash(i).call()
                const course = await contract.methods.getCourseByHash(courseHash).call()

                if(course) {
                    const normalize = normalizeOwnedCourse(web3)({hash: courseHash}, course)
                    courses.push(normalize)
                }
            }

            return courses
        }
    )
    return swrRes
}