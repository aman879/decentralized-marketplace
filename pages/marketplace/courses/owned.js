import { useAccount } from "@components/hooks/web3/useAccount";
import { useOwnedCourses } from "@components/hooks/web3/useOwnedCourses";
import { useWeb3 } from "@components/providers";
import Message from "@components/ui/common/message/Message";
import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import Base from "@components/ui/layout/base/Base";
import { MarketHeader } from "@components/ui/marketplace";
import courses from "@content/courses/index.json";
import { useRouter } from "next/router";
import Link from "next/link";

export default function OwnedCourses() {
    const router = useRouter()
    const {contract} = useWeb3()
    const {account} = useAccount()
    const {ownedCourses} = useOwnedCourses(courses, account.data, contract)
    
    return(
        <Base>
            <div className="pt-4">
                <MarketHeader />
            </div>
            <section className="grid grid-cols-1">
                { ownedCourses.isEmpty &&
                    <div>
                        <Message type="warning">
                            <div>You don't own any courses</div> 
                            <div>
                                <Link href="/marketplace" legacyBehavior>
                                    <a className="font-normal hover:underline">
                                        <i>Purchase course</i>
                                    </a>
                                </Link>
                            </div>
                        </Message> 
                    </div>
                }
                { account.isEmpty &&
                    <div>
                        <Message type="warning">
                            <div>Please connect to Metamask</div>
                        </Message>
                    </div>
                }
                { ownedCourses.data?.map(course =>
                    <OwnedCourseCard key={course.id} course={course}>
                        <button 
                            className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => router.push(`/courses/${course.slug}`)}
                        >
                            Watch the course
                        </button>
                    </OwnedCourseCard>
                )}
                
            </section>
        </Base>
    )
}