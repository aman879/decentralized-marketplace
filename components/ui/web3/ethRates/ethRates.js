import Image from "next/image"

export default function EthRates({price, changeCurrecy, curr, ethValue, value}) {
    return(
      <div>
        <div className="grid grid-cols-4 mb-5">
              <div className="flex flex-1 items-stretch text-center">
                <div className="p-10 border drop-shadow rounded-md">
                  <div className="flex items-center">
                  <Image
                      layout="fixed"
                      height='35'
                      width='35'
                      src='/small-eth.webp' 
                    />
                    <span className="text-2xl font-bold"> = {price}</span>
                  </div >
                  <p className="text-xl text-gray-500">Current eth Price</p>
                </div>
              </div>
              <div className="flex flex-1 items-stretch text-center">
                <div className="p-10 border drop-shadow rounded-md">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">{ethValue} = {value}</span>
                  </div>
                  <p className="text-xl text-gray-500">Price per course</p>
                </div>
              </div>
        </div>
        <button
          onClick={changeCurrecy}
          className="px-8 py-3 rounded-md border text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          {curr}
        </button>
      </div>
    )
}