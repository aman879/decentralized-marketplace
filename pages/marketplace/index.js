import React from "react";
import List from "@components/ui/course/list/list";
import Base from "@components/ui/layout/base/Base";
import courses from "@content/courses/index.json";
import WalletBar from "@components/ui/web3/walletbar/walletbar";
import Card from "@components/ui/course/card/Card";

export default function  Marketplace() { 
    return(
        <Base>
            <div className="py-4">
                <WalletBar />
            </div>
                <List courses = {courses}>
                    {course => <Card key={course.id} course={course}/>}
                </List>
        </Base>
    )
}


