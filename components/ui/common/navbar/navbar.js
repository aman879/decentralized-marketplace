import { useWeb3 } from "@components/providers"
import Link from "next/link"
import { useAccount } from "@components/hooks/web3/useAccount"
import { useRouter } from "next/router"

export default function Footer() {
    const { connect, isLoading, isWeb3Loaded} = useWeb3()
    const {account} = useAccount()
    const { pathname } = useRouter()
    return(
    <section>
        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
          <nav className="relative" aria-label="Global">
            <div className="flex justify-between items-center">
              <div>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Home</Link>
                <Link href="/marketplace" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Marketplace</Link>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Blogs</Link>
              </div>
              <div>
                <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Wishlist</Link>
                { (isLoading)
                    ? <button
                        onClick={connect}
                        disabled={true}
                        className="opacity-50 cursor-not-allowed px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Loading...
                      </button>
                    : isWeb3Loaded
                      ? account.data && !pathname.includes("/marketplace")
                        ? account.isAdmin
                          ? <button
                              onClick={connect}
                              className="px-8 py-3 cursor-default rounded-md border text-base font-medium text-white bg-yellow-400">
                              {account.data}
                            </button>
                          : <button
                              onClick={connect}
                              className="px-8 py-3 cursor-default rounded-md border text-base font-medium text-white bg-indigo-600">
                              {account.data}
                            </button>
                        : (!pathname.includes("/marketplace"))
                          ? <button
                              onClick={connect}
                              className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                              Connect
                            </button>
                          : <></>
                      : <button
                            onClick={() => window.open("https://metamask.io/download/", "_blank")}
                            target = "_blank"
                            className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Install Metamask
                          </button>
                  }
              </div>
            </div>
          </nav>
        </div>
    </section> 
    )
}