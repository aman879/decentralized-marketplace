import Image from "next/legacy/image"
import { useEthPrice } from "@components/hooks/useEthPrice";
import { useEffect, useState } from "react";
import Loader from "@components/ui/common/loader/Loader";

export default function EthRates() {
  const ethData = useEthPrice()
  const eth = ethData.eth
  const [currency, setCurrency] = useState("INR")
  const [price, setPrice] = useState(0)
  const [lastPrice, setLastPrice] = useState(5+"$")
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
        <div className="grid grid-cols-4 mt-5">
              <div className="flex flex-1 items-stretch text-center">
                <div className="p-5 border drop-shadow rounded-md">
                  <div className="flex items-center">
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
                      <span className="text-2xl font-bold"> = {price}</span>
                    </>
                    }
                  </div >
                  <p className="text-xl text-gray-500">Current eth Price</p>
                </div>
              </div>
              <div className="flex flex-1 items-stretch text-center">
                <div className="p-5 border drop-shadow rounded-md">
                  <div className="flex items-center">
                    { eth.data ?
                    <>
                      <span className="text-2xl font-bold">{ethVal.toFixed(6)} = {lastPrice}</span>
                    </> :
                    <div className="w-full flex justify-center">
                      <Loader size="sm"/>
                    </div>
                    }
                  </div>
                  <p className="text-xl text-gray-500">Price per course</p>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <button
                  onClick={onChangeCurrecy}
                  className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  {currency}
                </button>
              </div>
        </div>
    )
}