import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import CourseFilter from "@components/ui/course/filter/Filter";
import Base from "@components/ui/layout/base/Base";
import { MarketHeader } from "@components/ui/marketplace";

export default function ManageCourses() {
    return(
        <Base>
            <div className="pt-4">
                <MarketHeader />
                <CourseFilter />
            </div>
            <section className="grid grid-cols-1">
                {/* <OwnedCourseCard>
                    <div className="flex mr-2 relative rounded-md">
                        <input
                        type="text"
                        name="account"
                        id="account"
                        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0x2341ab..." />
                        <button className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Verify
                        </button>
                    </div>
                </OwnedCourseCard> */}
            </section>
        </Base>
    )
}