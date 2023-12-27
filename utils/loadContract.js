//   WHILE USING 1ST AND 2ND WAYS

import { useNetwork } from "@components/hooks/web3/useNetwork"

// import contract from "@truffle/contract"

// export const loadContract = async (name, provider) => {
//     const res = await fetch(`/contracts/${name}.json`)
//     const Artifact = await res.json()

//     const _contract = contract(Artifact)
//     _contract.setProvider(provider)

//     let deployedContract = null
//     try {
//         deployedContract = await _contract.deployed()
//     } catch {
//         console.log(`/contract ${name} cannot be loaded`)
//     }

//     return deployedContract
// }

//   FOR 3RD WAY

const networkid = process.env.NEXT_PUBLIC_NETWORK_ID

export const loadContract = async (name, web3) => {
    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();
    let contract = null;
    let netId = Number(await web3.eth.net.getId());

    const handleChainChange = async () => {
        netId = await web3.eth.net.getId();
        console.log("Network ID changed:", netId);
    };

    // Add event listener for chain changes
    if (window.ethereum) {
        window.ethereum.on("chainChanged", handleChainChange);
    }

    console.log("Network ID:", netId);

    try {
        contract = new web3.eth.Contract(
            Artifact.abi,
            Artifact.networks[netId].address
        );
    } catch {
        console.log(`Contract ${name} cannot be loaded`);
    }

    // Don't forget to remove the event listener when it's no longer needed
    const cleanup = () => {
        if (window.ethereum) {
            window.ethereum.off("chainChanged", handleChainChange);
        }
    };

    // Make sure to call cleanup when the component is unmounted or no longer needs the event listener
    // For example, you can return cleanup from your component or use it in another appropriate way
    // cleanup();

    return contract;
}