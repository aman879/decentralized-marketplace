//   WHILE USING 1ST AND 2ND WAYS

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

const network_id = process.env.NEXT_PUBLIC_NETWORK_ID

export const loadContract = async (name, web3) => {
    const res = await fetch(`contracts/${name}.json`)
    const Artifact = await res.json()
    let contract = null

    try {
        contract = new web3.eth.Contract(
            Artifact.abi,
            Artifact.networks[network_id].address
        )
    } catch {
        console.log(`Contract ${name} cannot be loaded`)
    }

    return contract
}