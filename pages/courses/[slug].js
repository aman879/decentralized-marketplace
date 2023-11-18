import Hero from "@components/course/hero/Hero"
import Keypoints from "@components/course/keypoints/Keypoints"
import Curriculum from "@components/course/curriculum/Curriculum"
import Modal from "@components/common/modal/Modal"
import Base from "@components/layout/base/Base"
import { useRouter } from "next/router"
import courses from "@content/courses/index.json"

export default function Course() {  
    const router = useRouter();
    const { slug } = router.query;

    const course = getCourseData(slug);
    
    return (
        <Base>
            <div className="py-4">
                {course 
                    ? <Hero title={course.title} description={course.description} image={course.coverImage}/>
                    : <Hero/>
                }
            </div>
            {course
                ?<Keypoints points={course.wsl} />
                :<Keypoints/>
            }
            <Curriculum locked={true}/>
            <Modal />
        </Base>
    )
  }

export function getCourseData(slug) {
    const course = courses.filter(c => c.slug === slug)[0]
    return course;
}