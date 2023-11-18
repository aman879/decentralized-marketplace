import Navbar from "@components/ui/common/navbar/navbar";
import Footer from "@components/ui/common/footer/footer";

export default function Base({children}) {

    return(
        <>
            <div className="max-w-7xl mx-auto px-4">
            <Navbar />
            <div className="fit">
                {children}
            </div>
            </div>
            <Footer />
      </>
    )
}