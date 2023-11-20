import React from "react";
import List from "@components/ui/course/list/list";
import Base from "@components/ui/layout/base/Base";
import courses from "@content/courses/index.json";
import WalletBar from "@components/ui/web3/walletbar/walletbar";

export default function  Marketplace() { 
    return(
        <Base>
            <div className="py-4">
                <WalletBar />
            </div>
                <List courses = {courses} />
        </Base>
    )
}


