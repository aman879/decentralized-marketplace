const { createContext, useContext, useEffect, useState, useMemo } = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setUpHooks } from "./hooks/setUpHooks";
import { loadContract } from "@utils/loadContract";

const Web3Context = createContext(null)

const createWeb3State = ({ web3, provider, contract, isLoading }) => {  
    return {
        web3,
        provider,
        contract,
        isLoading,
        hooks: setUpHooks({web3})
    };
};


export default function Web3Provider({children}) {
    const [web3Api, setWeb3Api] = useState(
        createWeb3State({
            web3: null,
            provider: null,
            contract: null,
            isLoading: true 
        })
    )

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            if(provider) {
                const web3 = new Web3(provider);
                const contract = await loadContract("CourseMarketplace", web3)
                setWeb3Api(
                    createWeb3State({
                        web3,
                        provider,
                        contract,
                        isLoading: false
                    })
                )
            } else {
                setWeb3Api(api => ({...api, isLoading: false}))
                console.error("please, install Metamask");
            }
        }

        loadProvider()
    }, [])

    const _web3Api = useMemo(() => {
        return {
            ...web3Api,
            isWeb3Loaded: web3Api.web3 != null,
            getHooks: () => setUpHooks(web3Api.web3),
            connect: web3Api.provider 
                ? async () => {
                        try {
                            await web3Api.provider.request({method: "eth_requestAccounts"})
                        } catch(e) {
                            location.reload()
                        }
                    }
                : () => console.error("Can not connect to Metamask, try to reload your browser")
        }
    }, [web3Api])
  return (
    <Web3Context.Provider value={_web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks(cb) {
    const { getHooks } = useWeb3()
    if(getHooks) {
        return cb(getHooks())
    }
    
}