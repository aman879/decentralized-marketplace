import Hero from "@components/ui/course/hero/Hero"
import Keypoints from "@components/ui/course/keypoints/Keypoints"
import Curriculum from "@components/ui/course/curriculum/Curriculum"
import Modal from "@components/ui/common/modal/Modal"
import Base from "@components/ui/layout/base/Base"
import { useRouter } from "next/router"
import courses from "@content/courses/index.json"
import { useOwnedCourse } from "@components/hooks/web3/useOwnedCourse"
import { useWeb3 } from "@components/providers"
import { useAccount } from "@components/hooks/web3/useAccount"
import Message from "@components/ui/common/message/Message"

export default function Course() {  
    const {contract} = useWeb3()
    const {account} = useAccount()
    const router = useRouter();
    const { slug } = router.query;
    
    const course = getCourseData(slug);

    const { ownedCourse } = useOwnedCourse(contract, account.data, course)
    const courseState = ownedCourse.data?.state
    //const courseState = "activated"

    const isLocked =
    !courseState ||
     courseState === "purchased" || courseState === "deactivated"
    
    return (
        <Base>
             <div className="py-4">
                {course &&
                     <Hero title={course.title} description={course.description} image={course.coverImage} hasOwner={!!ownedCourse.data}/>
                }
            </div>
            {course &&
                <Keypoints points={course.wsl} />
            }
            { courseState &&
                <div className="max-w-5xl mx-auto">
                    { courseState === "purchased" && 
                        <Message type="warning">
                            Course Purchased and waiting for activation. Process can take up to 24 hours.
                            <i className="block font-normal">In case of any questions, please contract info@company.com</i>
                        </Message>
                    }
                    { courseState === "activated" && 
                        <Message type="warning">
                            We wishes happy learning.
                            <i className="block font-normal">In case of any questions, please contract info@company.com</i>
                        </Message>
                    }
                    { courseState === "deactivated" && 
                        <Message type="danger">
                            Course has been deactivated, due to incorrect purchase data.
                            Course has been temporaly disabled
                            <i className="block font-normal">In case of any questions, please contract info@company.com</i>
                        </Message>
                    }
                </div>
            }
            <Curriculum locked={isLocked} courseState={courseState}/>
            <Modal />
        </Base>
    )
  }

export function getCourseData(slug) {
    const course = courses.filter(c => c.slug === slug)[0]
    return course;
}