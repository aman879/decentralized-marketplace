import { useWeb3 } from "@components/providers"
import Link from "next/link"

export default function Footer() {
    const { connect, isLoading, isWeb3Loaded} = useWeb3()
    return(
    <section>
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav className="relative" aria-label="Global">
            <div className="flex justify-between">
              <div>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</Link>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</Link>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</Link>
              </div>
              <div>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Wishlist</Link>
                { (isLoading)
                    ? <Link
                        onClick={connect}
                        href="/" 
                        disabled
                        className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Loading...
                      </Link>
                    : isWeb3Loaded
                        ? <Link
                            onClick={connect}
                            href="/"
                            className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Connect
                          </Link>
                        : <Link 
                            onClick={connect}
                            target = "_blank"
                            href="https://metamask.io/download/" 
                            className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Install Metamask
                           </Link>     
                  }
              </div>
            </div>
          </nav>
        </div>
    </section> 
    )
}