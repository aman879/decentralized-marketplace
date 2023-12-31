import WalletBar from "@components/ui/web3/walletbar/walletbar";
import Breadcrumbs from "@components/ui/common/breadcrumbs/breadcrumbs";
import EthRates from "@components/ui/web3/ethRates/ethRates";

const LINKS = [{
    href: "/marketplace",
    value: "Buy"
},  {
    href: "/marketplace/courses/owned",
    value: "My Courses"
}, {
    href: "/marketplace/courses/manage",
    value: "Manage Courses"
}]

export default function Header() {
    return (
        <>
            <div className="mt-2">
                <WalletBar />
            </div>
            <EthRates />
            <div className="flex flex-row-reverse p-4 px-4 sm:px-6 lg:px-8">
                <Breadcrumbs items={LINKS}/>
            </div>
        </>
    )
}