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
import { withToast } from "@utils/toast";
import Loader from "@components/ui/common/loader/Loader";



export default function  Marketplace() {
    const { web3, contract, isWeb3Loaded } = useWeb3()
    const {hasConnectedWallet, account, network} = useWalletInfo()
    const { ownedCourses } = useOwnedCourses(courses, account.data, contract, network.data)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [busyCourseId, setBusyCourseId] = useState(null)
    const [isNewPurchase, setIsNewPurchase] = useState(true)

    const purchaseOrder = async (order, course) => {

        const hexCourseId = web3.utils.utf8ToHex(course.id).padEnd(34, '0');

        const orderHash = web3.utils.soliditySha3(
            { type: "bytes16", value: hexCourseId },
            { type: "address", value: account.data}
        )

        
        const value = web3.utils.toWei(order.price, 'ether')
        
        setBusyCourseId(course.id)
        if(isNewPurchase) {
            const emailHash = web3.utils.sha3(order.email)
        
            const proof = web3.utils.soliditySha3(
                { type: "bytes32", value: emailHash},
                { type: "bytes", value: orderHash }
            )
            withToast(_purchaseCourse({hexCourseId, proof, value}, course))
        } else {
           withToast(_repurchaseCourse({courseHash: orderHash, value}, course))
        }
    }
    
    const _purchaseCourse = async ({hexCourseId, proof, value}, course) => {
        try {
            const result = await contract.methods.purchaseCourse(
                hexCourseId,
                proof
            ).send({from: account.data, value })
            ownedCourses.mutate([
                ...ownedCourses.data, {
                    ...courses,
                    proof,
                    state: "purchased",
                    owner: account.data,
                    price: value
                }
            ])
            return result
        } catch(e) {
            throw new Error(e.message)
        } finally {
            setBusyCourseId(null)
        }
    }
    
    const _repurchaseCourse = async ({courseHash, value}, course) => {
        try {
            const result =await contract.methods.repurchaseCourse(
                courseHash
            ).send({from: account.data, value })

            const index = ownedCourses.data.findIndex(c => c.id === course.id)

            if (index >= 0) {
                ownedCourses.data[index].state = "purchased"
                ownedCourses.mutate(ownedCourses.data)
            }

            ownedCourses.mutate()
            return result
        } catch(e) {
            throw new Error(e.message)
        } finally {
            setBusyCourseId(null)
        }
    }

    const cleanUpModal = () => {
        setSelectedCourse(null)
        setIsNewPurchase(true)
    }

    // const notify = () => {
    //     const resolveWithSomeData = new Promise(resolve => setTimeout(() => resolve({transactionHash: "0xAaaB8a42FEA41bbA75C75eFe36fc91D3c8567624"}), 3000));
    //     //const resolveWithSomeData = new Promise((resolve, reject) => setTimeout(() => reject(new Error("world")), 3000));
        
    //     withToast(resolveWithSomeData)
    // }

    return(
        <Base>
            <MarketHeader />
            {/* <button onClick={notify}>Notify</button> */}
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

                                const isBusy = busyCourseId === course.id
                                //const isBusy = true
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
                                                disabled={isBusy || false}
                                                className="mt-3 px-8 py-2 rounded-md border text-base font-medium text-red-700 bg-red-100 hover:bg-red-200"
                                                >
                                                {
                                                    isBusy ?
                                                    <div className="flex">
                                                        <Loader size="sm" />
                                                        <div className="ml-2">In Progress</div>
                                                    </div> :
                                                    <div>Fund to Repurchase</div>
                                                }
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
                                    disabled={!hasConnectedWallet || isBusy}
                                    className="mt-3 px-8 py-2 rounded-md border text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                                        {
                                            isBusy ?
                                            <div className="flex">
                                                <Loader size="sm" />
                                                <div className="ml-2">In Progress</div>
                                            </div> :
                                            <div>Purchase</div>
                                        }
                                    </button>
                                )
                            
                            }
                        }/>
                    )
                }}
        </List>
        { selectedCourse &&
            <OrderModal
                onClose={cleanUpModal}
                course={selectedCourse}
                isNewPurchase={isNewPurchase}
                onSubmit={(formData, course) => {
                    purchaseOrder(formData, course)
                    cleanUpModal()
                }}/>
        }
        </Base>
    )
}



