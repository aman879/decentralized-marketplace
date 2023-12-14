import { useWalletInfo } from "@components/hooks/web3/useWalletInfo"
import { useWeb3 } from "@components/providers"

export default function WallteBar() {
  const {isWeb3Loaded} = useWeb3()
  const {account, network} = useWalletInfo()
  var netData
  if(network.isLoaded) {
    netData = network.data
  }
  const address = account.data
  let color = "bg-indigo-600"
  let admin = ""
  if(account.isAdmin) {
    color = "bg-yellow-400"
    admin = "Admin"
  }
    return(
      <section className={`text-white rounded-lg ${color}`}>
              <div className="p-8">
                <h1 className="text-2xl">Hello, {admin} {address}</h1>
                <h2 className="subtitle mb-5 text-xl">I hope you are having a great day!</h2>
                <div className="flex justify-between items-center">
                  <div className="sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
                        Learn how to purchase
                      </a>
                    </div>
                  </div>
                  <div>
                    { !isWeb3Loaded
                        ? <div className="bg-yellow-500 p-4 rounded-lg">
                            Cannot connect to Network, Please install Metamask.   
                          </div>
                        : netData && address
                          ? <div><span>Currently on </span><strong className="text-2xl">{netData}</strong></div>
                          : <div className="bg-yellow-500 p-4 rounded-lg">Please connect to your wallet.</div>
                    }
                  </div>
                </div>
              </div>
        </section>
    )
}