import Image from "next/legacy/image"
import Link from "next/link"


export default function Card({course, Footer}) {
    return(
        <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="flex h-full">
            <div className="flex-1 h-full next-image-wrapper">
                <Image 
                className="object-cover" 
                src={course.coverImage}
                layout="responsive"
                width="200"
                height="250" 
                alt={course.title} />
            </div>
            <div className="p-8 pb-4 flex-2">
                <div 
                className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {course.type}
                </div>
                <Link href={`/courses/${course.slug}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                {course.title}
                </Link>
                <p 
                className="mt-2 text-gray-500">
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