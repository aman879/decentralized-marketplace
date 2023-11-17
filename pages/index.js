import React from "react";
import Hero from "@components/common/hero/Hero";
import Breadcrumbs from "@components/common/breadcrumbs/breadcrumbs";
import EthRates from "@components/web3/ethRates/ethRates";
import WaleltBar from "@components/web3/walletbar/walletbar";
import Card from "@components/order/card/card";
import List from "@components/course/list/list";
import Base from "@components/layout/base/Base";

class Home extends React.Component {
  render() {
    return (
      <Base>
        <Hero />
        <Breadcrumbs />
        <EthRates />
        <WaleltBar />
        <Card/>
        <List />
      </Base>
      )
    }
}

export default Home;
