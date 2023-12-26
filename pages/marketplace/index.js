import React, { useEffect, useState } from "react";
import List from "@components/ui/course/list/list";
import Base from "@components/ui/layout/base/Base";
import courses from "@content/courses/index.json";
import Card from "@components/ui/course/card/Card";
import OrderModal from "@components/ui/order/modal/OrderModal";
import { useWalletInfo } from "@components/hooks/web3/useWalletInfo";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";
import { useOwnedCourses } from "@components/hooks/web3/useOwnedCourses";

export default function  Marketplace() {
    const { web3, contract, isWeb3Loaded } = useWeb3()
    const {hasConnectedWallet, account, network} = useWalletInfo()
    const { ownedCourses } = useOwnedCourses(courses, account.data, contract, network.data)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [isNewPurchase, setIsNewPurchase] = useState(true)

    const purchaseOrder = async order => {
        const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id).padEnd(34, '0');

        const orderHash = web3.utils.soliditySha3(
            { type: "bytes16", value: hexCourseId },
            { type: "address", value: account.data}
        )

        
        const value = web3.utils.toWei(order.price, 'ether')
        
        if(isNewPurchase) {
            const emailHash = web3.utils.sha3(order.email)
        
            const proof = web3.utils.soliditySha3(
                { type: "bytes32", value: emailHash},
                { type: "bytes", value: orderHash }
            )
            _purchaseCourse(hexCourseId, proof, value)
        } else {
            _repurchaseCourse(orderHash, value)
        }
    }
    
    const _purchaseCourse = async (hexCourseId, proof, value) => {
        try {
            await contract.methods.purchaseCourse(
                hexCourseId,
                proof
            ).send({from: account.data, value })
        } catch(e) {
            console.log("Purchase error", e)
        }
    }
    
    const _repurchaseCourse = async (courseHash, value) => {
        try {
            await contract.methods.repurchaseCourse(
                courseHash
            ).send({from: account.data, value })
        } catch(e) {
            console.log("Purchase error", e)
        }
    }

    return(
        <Base>
            <div className="pt-4">
                 <MarketHeader />
            </div>
                <List courses = {courses}>
                    {course => {
                        const owned = ownedCourses.lookup[course.id]
                        return (
                            <Card 
                                key={course.id}
                                state={owned?.state}
                                disabled={!hasConnectedWallet} 
                                course={course} 
                                Footer={() =>  {
                                    
                                    if(!isWeb3Loaded) {
                                        return (
                                                <button
                                                onClick={() => setSelectedCourse(course)}
                                                disabled={true}
                                                className="mt-3 px-8 py-2 rounded-md border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                                        Install Metamask
                                                </button>
                                            )
                                        }


                                        if (owned) {
                                            return (
                                                <div>
                                                    {
                                                        owned.state === "deactivated" ?
                                                        <button
                                                        onClick={() => {
                                                            setIsNewPurchase(false)
                                                            setSelectedCourse(course)
                                                        }}
                                                        disabled={false}
                                                        className="mt-3 px-8 py-2 rounded-md border text-base font-medium text-red-700 bg-red-100 hover:bg-red-200"
                                                        >
                                                            Fund to Activate
                                                        </button> :
                                                        <button
                                                        onClick={() => window.location.href = `/courses/${course.slug}`}
                                                        disabled={false}
                                                        className="mt-3 px-8 py-2 rounded-md border text-base font-medium text-green-700 bg-green-100 hover:bg-green-200"
                                                        >
                                                                Watch Course
                                                        </button>
                                                    }
                                                </div>
                                            );
                                        }
                                        
                                        
                                        return (
                                            <button
                                            onClick={() => setSelectedCourse(course)}
                                            disabled={!hasConnectedWallet}
                                            className="mt-3 px-8 py-2 rounded-md border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                                    Purchase
                                            </button>
                                        )
                                    
                                    }
                                }/>
                            )
                        }}
                </List>
                { selectedCourse &&
                    <OrderModal
                        onClose={() => {
                            setSelectedCourse(null)
                            setIsNewPurchase(true)
                        } }
                        course={selectedCourse}
                        isNewPurchase={isNewPurchase}
                        onSubmit={purchaseOrder}/>
                }
        </Base>
    )
}



