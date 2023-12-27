import { useAccount } from "@components/hooks/web3/useAccount";
import { useAdmin } from "@components/hooks/web3/useAdmin";
import { useManageCourses } from "@components/hooks/web3/useManageCourses";
import { useWeb3 } from "@components/providers";
import Message from "@components/ui/common/message/Message";
import ManageCard from "@components/ui/course/card/ManageCard";
import CourseFilter from "@components/ui/course/filter/Filter";
import Base from "@components/ui/layout/base/Base";
import { MarketHeader } from "@components/ui/marketplace";
import { normalizeOwnedCourse } from "@utils/normalize";
import { withToast } from "@utils/toast";
import { useEffect, useState } from "react";

const VerificationInput = ({onVerify}) => {
    const [email, setEmail] = useState("")
    return (
        <div className="flex items-center">
            <input
                value={email}
                onChange={({target: {value}}) => setEmail(value)}
                type="text"
                name="account"
                id="account"
                className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md mr-2"
                placeholder="0x2341ab..."
            />
            <button onClick={() => {
                    onVerify(email)
                }} 
                className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Verify
            </button>
        </div>
    )
}

export default function ManageCourses() {
    
    const [proofedOwnersip, setProofOwnerShip] = useState({})
    const [searchedCourse, setSearchedCourse] = useState(null)
    const [filters, setFilters] = useState({state: "all"})
    const { contract, web3 } = useWeb3()
    const { account } = useAdmin({redirectTo: "/marketplace"})
    const { manageCourses } = useManageCourses(contract, account)


    const verifyCourse = (email, {hash, proof}) => {
        if(!email) {
            return
        }
        const emailHash = web3.utils.sha3(email)
        const proofToCheck = web3.utils.soliditySha3(
            { type: "bytes", value: emailHash},
            { type: "bytes", value:hash}
        )

        proofToCheck === proof ? 
            setProofOwnerShip({
                [hash] : true
            }) :
            setProofOwnerShip({
                [hash] : false
            })
    }

    const activateCourse = async (courseHash) => {
        try {
            const result = await contract.methods.activateCourse(courseHash).send({
                from: account.data
            })
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const deactivateCourse = async (courseHash) => {
        try {
            const result = await contract.methods.deactivateCourse(courseHash).send({
                from: account.data
            })

            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const onSearchCourse = async (hash) => {

        const re = /[0-9A-Fa-f]{6}/g

        if(hash && hash.length === 66 && re.test(hash)) {
            const course = await contract.methods.getCourseByHash(hash).call()
            if (course.owner !== "0x0000000000000000000000000000000000000000") {
                const normalized = normalizeOwnedCourse(web3)({hash}, course)
                setSearchedCourse(normalized)
                return
            }
        }
        setSearchedCourse(null)
    }

    const renderCards = (course) => {
        return (
            <ManageCard
                key={course.ownedCourseId}
                course={course}
            >
                <VerificationInput 
                    onVerify={(email) => {
                        verifyCourse(email, {hash: course.hash, proof: course.proof})
                    }}
                />
                { proofedOwnersip[course.hash] &&
                    <div className="mt-2">
                        <Message>
                            Verified! 
                        </Message>
                    </div>
                }
                { proofedOwnersip[course.hash] === false &&
                    <div className="mt-2">
                        <Message type="danger">
                            Wrong Proof! 
                        </Message>
                    </div>
                }
                {
                    course.state === "purchased" &&
                    <div>
                        <button 
                            onClick={() => withToast(activateCourse(course.hash))}
                            className="mt-2 mr-2 px-8 py-3 rounded-md border text-base font-medium text-white bg-green-600 hover:bg-green-700">
                            Activate
                        </button>
                        <button
                            onClick={() => withToast(deactivateCourse(course.hash))}
                            className="mt-2 px-8 py-3 rounded-md border text-base font-medium text-white bg-red-600 hover:bg-red-700">
                            Deactivate
                        </button>
                    </div>
                }
            </ManageCard>
        )
    }

        

    if(!account.isAdmin) {
        return null
    }

    const filteredCourse = manageCourses.data
        ?.filter((course) => {
            if(filters.state === "all") {
                return true
            }
            return course.state === filters.state
        })
        .map(course => renderCards(course) )

    return(
        <Base>
            <div className="pt-4">
                <MarketHeader />
                <CourseFilter
                    onFilterSelect={(value) => setFilters({state: value})} 
                    onSearchSubmit={onSearchCourse}
                />
            </div>
            <section className="grid grid-cols-1">
                { searchedCourse && 
                    <div>
                        {renderCards(searchedCourse)}
                    </div>
                }
                <h1 className="text-2xl font-bold p-5">All Courses</h1>
                { filteredCourse }
                { !filteredCourse && 
                    <Message type="danger">
                        No course to display
                    </Message>
                }
            </section>
        </Base>
    )
}