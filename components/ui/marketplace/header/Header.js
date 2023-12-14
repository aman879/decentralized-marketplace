import WalletBar from "@components/ui/web3/walletbar/walletbar";
import Breadcrumbs from "@components/ui/common/breadcrumbs/breadcrumbs";
import EthRates from "@components/ui/web3/ethRates/ethRates";

export default function Header() {
    return (
        <>
            <WalletBar />
            <EthRates />
            <div className="flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />
            </div>
        </>
    )
}