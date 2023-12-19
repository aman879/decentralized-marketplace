import Message from "@components/ui/common/message/Message";
import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import Base from "@components/ui/layout/base/Base";
import { MarketHeader } from "@components/ui/marketplace";

export default function OwnedCourses() {
    return(
        <Base>
            <div className="pt-4">
                <MarketHeader />
            </div>
            <section className="grid grid-cols-1">
                <OwnedCourseCard>
                    <Message>
                        Purchased!
                    </Message>
                    <button className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Watch the course
                    </button>
                </OwnedCourseCard>
            </section>
        </Base>
    )
}