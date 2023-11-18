import Image from "next/legacy/image"
import Link from "next/link"


export default function List({courses}) {
    return(
        <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
              { courses.map(courses =>
                <div key={courses.id} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                  <div className="flex h-full">
                    <div className="flex h-full">
                      <Image 
                        className="object-cover" 
                        src={courses.coverImage}
                        layout="fixed"
                        width="200"
                        height="230" 
                        alt={courses.title} />
                    </div>
                    <div className="p-8">
                      <div 
                        className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                          {courses.type}
                      </div>
                      <Link href={`/courses/${courses.slug}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                        {courses.title}
                      </Link>
                      <p 
                        className="mt-2 text-gray-500">
                        {courses.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
        </section>
    )
}