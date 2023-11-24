import React, { useState } from "react";
import List from "@components/ui/course/list/list";
import Base from "@components/ui/layout/base/Base";
import courses from "@content/courses/index.json";
import WalletBar from "@components/ui/web3/walletbar/walletbar";
import Card from "@components/ui/course/card/Card";
import OrderModal from "@components/ui/order/modal/OrderModal";

export default function  Marketplace() { 
    const [selectedCourse, setSelectedCourse] = useState(null)
    return(
        <Base>
            <div className="py-4">
                <WalletBar />
            </div>
                <List courses = {courses}>
                    {course => 
                        <Card 
                            key={course.id} 
                            course={course} 
                            Footer={() => 
                                <div className="mt-4">
                                    <button
                                        onClick={() => setSelectedCourse(course)}
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


