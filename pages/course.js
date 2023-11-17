import Hero from "@components/course/hero/Hero"
import Keypoints from "@components/course/keypoints/Keypoints"
import Curriculum from "@components/course/curriculum/Curriculum"
import Modal from "@components/common/modal/Modal"
import Base from "@components/layout/base/Base"
export default function Course() {  
    return (
        <Base>
            <div className="py-4">
                <Hero />
            </div>
            <Keypoints />
            <Curriculum />
            <Modal />
        </Base>
    )
  }