import Image from "next/legacy/image"
import { useEthPrice } from "@components/hooks/useEthPrice";
import { useEffect, useState } from "react";
import Loader from "@components/ui/common/loader/Loader";

export default function EthRates() {
  const ethData = useEthPrice()
  const eth = ethData.eth
  const [currency, setCurrency] = useState("INR")
  const [price, setPrice] = useState(0)
  const [lastPrice, setLastPrice] = useState(1+"$")
  const [ethVal, setEthVal] = useState(0)

  useEffect(() => {
      if (eth.data) {
          setPrice(eth.data.usd + "$");
          setEthVal(eth.perItem)
      }
  }, [eth.data]);

  const onChangeCurrecy = () => {
    if(currency === "INR") {
        setCurrency("USD")
        setPrice("₹" + eth.data.inr)
        setLastPrice("₹" + (eth.perItem*eth.data.inr).toFixed(2))
    } else {
        setCurrency("INR")
        setPrice(eth.data.usd + "$")
        setLastPrice(5+"$")
    }
  }

    return(
        <div className="flex flex-col xs:flex-row text-center mt-2">
              <div className="p-5 border drop-shadow rounded-md mr-2">
                <div className="flex items-center justify-center">
                  { !eth.data ?
                    <div className="w-full flex justify-center">
                      <Loader size="sm"/>
                    </div> :
                  <>
                    <Image
                      layout="fixed"
                      height='35'
                      width='35'
                      src='/small-eth.webp' 
                    />
                    <span className="text-xl font-bold"> = {price}</span>
                  </>
                  }
                </div >
                <p className="text-lg text-gray-500">Current eth Price</p>
              </div>
              <div className="p-5 mt-2 xs:mt-0 border drop-shadow rounded-md">
                <div className="flex items-center justify-center">
                  { eth.data ?
                  <>
                    <span className="text-xl font-bold">{ethVal.toFixed(6)}</span>
                    <Image
                      layout="fixed"
                      height='35'
                      width='35'
                      src='/small-eth.webp' 
                    />
                    <span className="text-xl font-bold"> = {lastPrice}</span>
                  </> :
                  <div className="w-full flex justify-center">
                    <Loader size="sm"/>
                  </div>
                  }
                </div>
                <p className="text-lg text-gray-500">Price per course</p>
              </div>
              <div className="col-span-2 flex items-center justify-center ml-2 mt-2 xs:mt-0">
                <button
                  onClick={onChangeCurrecy}
                  className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  {currency}
                </button>
              </div>
        </div>
    )
}