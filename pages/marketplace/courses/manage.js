import OwnedCourseCard from "@components/ui/course/card/OwnedCourseCard";
import Base from "@components/ui/layout/base/Base";
import { MarketHeader } from "@components/ui/marketplace";

export default function ManageCourses() {
    return(
        <Base>
            <div className="pt-4">
                <MarketHeader />
            </div>
            <section className="grid grid-cols-1">
                <OwnedCourseCard />
            </section>
        </Base>
    )
}