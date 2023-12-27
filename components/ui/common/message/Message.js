import { useState } from "react"


const TEXT_TYPES = {
    success: "text-green-900",
    warning: "text-yellow-900",
    danger: "text-red-900"
}

const BG_TYPES = {
    success: "bg-green-100",
    warning: "bg-yellow-100",
    danger: "bg-red-100"
}


export default function Message({children, type = "success"}) {
    const [isDisplayed, setIsDisplyed] = useState(true)

    if(!isDisplayed) {return null}

    return (
        <div className={`${BG_TYPES[type]} rounded-xl mb-3`}>
              <div className="max-w-7xl mx-auto py-3 px-3 sm:px-3 lg:px-3">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="w-0 flex-1 flex items-center">
                    <div className={`ml-3 font-medium ${TEXT_TYPES[type]} truncate`}>
                      <span className="inline">
                        {children}
                      </span>
                    </div>
                  </div>
                  <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                    <button
                        onClick={() => setIsDisplyed(false)} 
                        type="button" 
                        className="-mr-1 flex p-2 rounded-md  focus:outline-none focus:ring-2 sm:-mr-2">
                      <span className="sr-only">Dismiss</span>
                      <svg className={`h-6 w-6 ${TEXT_TYPES[type]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                   </div>
                </div>
            </div>
        </div>
    )
}