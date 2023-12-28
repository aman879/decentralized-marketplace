import { useWalletInfo } from "@components/hooks/web3/useWalletInfo"
import { useWeb3 } from "@components/providers"

export default function WallteBar() {
  const {isWeb3Loaded, web3} = useWeb3()
  const {account, network} = useWalletInfo()
  var netData
  if(network.isLoaded) {
    netData = network.data
  }
  const address = account.data
  let color = "bg-indigo-600"
  let admin = ""
  if(account.isAdmin) {
    color = "bg-gray-700"
    admin = "Admin"
  }
    return(
      <section className={`text-white rounded-lg ${color}`}>
              <div className="p-8">
                <h1 className="text-base xs:text-xl break-words">Hello, {admin} {address}</h1>
                <h2 className="subtitle mb-5 text-sm xs:text-base">I hope you are having a great day!</h2>
                <div className="flex justify-between items-center">
                  <div className="sm:flex sm:justify-center lg:justify-start">
                    <button className="mr-2 mt-3 p-2 xs:px-8 xs:py-3 rounded-md border text-sm xs:text-base font-medium text-black bg-white">
                      Learn how to purchase
                    </button>
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