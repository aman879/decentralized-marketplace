import Image from "next/legacy/image"
import Link from "next/link"
import { AnimateKeyframes } from "react-simple-animate"

const STATE_COLORS = {
    purchased: "indigo",
    activated: "green",
    deactivated: "red",
}

const STATE_TEXT = {
    purchased: "Pending",
    activated: "Activated",
    deactivated: "Deactivated",
}

export default function Card({state,course,disabled, Footer}) {

    const stateColor = STATE_COLORS[state];
    const stateText = STATE_TEXT[state];

    return(
        <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="flex">
            <div className="flex-1 next-image-wrapper">
                <img 
                className={`object-cover ${disabled && "filter grayscale"}`} 
                src={course.coverImage}
                width="200"
                height="300" 
                alt={course.title} />
            </div>
            <div className="p-8 pb-4 flex-2">
                <div className="flex items-center">
                    <div 
                    className="mr-4 uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {course.type}                    
                    </div>
                    <div>
                    {
                        state === "purchased" 
                        ?  
                                <AnimateKeyframes
                                play
                                duration={2.5}
                                keyframes={["opacity: 0.4", "opacity: 1"]}
                                iterationCount="infinite"
                            >
                                <div className={`text-xs text-black bg-yellow-200 rounded-full p-1 px-3`}>{stateText}</div>
                            </AnimateKeyframes>
                        
                        :  <div className={`text-xs text-black bg-${stateColor}-200 rounded-full p-1 px-3`}>{stateText}</div>
                    }
                    </div>
                </div>
                <Link href={`/courses/${course.slug}`} className="block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline">
                {course.title}
                </Link>
                <p 
                className="mt-2 text-sm sm:text-base text-gray-500">
                {course.description.substring(0,70)}...
                </p>
                { Footer &&
                    <Footer />
                }
            </div>
            </div>
        </div>
           
    )
}