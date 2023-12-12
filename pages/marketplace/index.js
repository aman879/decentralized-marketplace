import React, { useState, useEffect } from "react";
import List from "@components/ui/course/list/list";
import Base from "@components/ui/layout/base/Base";
import courses from "@content/courses/index.json";
import WalletBar from "@components/ui/web3/walletbar/walletbar";
import Card from "@components/ui/course/card/Card";
import OrderModal from "@components/ui/order/modal/OrderModal";
import { useEthPrice } from "@components/hooks/useEthPrice";
import EthRates from "@components/ui/web3/ethRates/ethRates";
import { useAccount } from "@components/hooks/web3/useAccount"

export default function  Marketplace() {
    const {account} = useAccount()
    const ethData = useEthPrice()
    const eth = ethData.eth
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [currency, setCurrency] = useState("INR")
    const [price, setPrice] = useState(0)
    const [lastPrice, setLastPrice] = useState(5+"$")
    const [ethVal, setEthVal] = useState(0)
    
    const canPurchaseCourse = !!(account.data)
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
        <Base>
            <div className="py-4">
                <WalletBar />
                <EthRates 
                    price={price}
                    changeCurrecy={onChangeCurrecy}
                    curr={currency}
                    ethValue={ethVal.toFixed(6)}
                    value={lastPrice}
                />
            </div>
                <List courses = {courses}>
                    {course => 
                        <Card 
                            key={course.id}
                            disabled={!canPurchaseCourse} 
                            course={course} 
                            Footer={() => 
                                <div className="mt-4">
                                    <button
                                        onClick={() => setSelectedCourse(course)}
                                        disabled={!canPurchaseCourse}
                                        className="px-8 py-2 rounded-md border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                            Purchase
                                    </button>
                                </div>
                    }/>}
                </List>
                { selectedCourse &&
                    <OrderModal
                        onClose={() => setSelectedCourse(null)} 
                        course={selectedCourse}/>
                }
        </Base>
    )
}


