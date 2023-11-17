import React from "react";
import Navbar from "@components/common/navbar/navbar";
import Footer from "@components/common/footer/footer";
import Hero from "@components/common/hero/Hero";
import Breadcrumbs from "@components/common/breadcrumbs/breadcrumbs";
import EthRates from "@components/web3/ethRates/ethRates";
import WaleltBar from "@components/web3/walletbar/walletbar";
import Card from "@components/order/card/card";
import List from "@components/course/list/list";

class Home extends React.Component {
  render() {
    return (
      <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            <Hero />
            <Breadcrumbs />
            <EthRates />
            <WaleltBar />
            <Card/>
            <List />
          </div>
        </div>
        <Footer />
      </div>
    </div>
      )
    }
}

export default Home;
