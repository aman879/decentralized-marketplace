import { useEffect, useState } from "react";
import useSWR from "swr";

const adminAddress = {
    "0xd608a4f3729ad3c4e7b90c239e2dd7fcd73defd66ddf14c3f8da465e81414b6b": true,
    "0x45c8789ae346dd6a6ca843dda9236d8d23da6b47101e4b7d97d269ecee695c97": true
};

//       USING STATE

// export const handler = (web3) => () => {
//     const [account, setAccount] = useState(null);
//     const [isAdmin, setAdmin] = useState(false);

//     useEffect(() => {
//         const getAccount = async () => {
//             const accounts = await web3.eth.getAccounts();
//             const currentAccount = accounts[0];
//             setAccount(currentAccount);
//         };

//         web3 && getAccount();
//     }, [web3]);

//     useEffect(() => {
//         const checkAdminStatus = async () => {
//             if (adminAddress[web3.utils.keccak256(account)]) {
//                 setAdmin(true);
//             } else {
//                 setAdmin(false)
//             }
//         };

//         account && checkAdminStatus();
//     }, [account]);

//     useEffect(() => {
//         const handleAccountsChanged = (accounts) => {
//             setAccount(accounts[0] ?? null);
//         };

//         window.ethereum &&
//             window.ethereum.on("accountsChanged", handleAccountsChanged);

//         return () => {
//             window.ethereum &&
//                 window.ethereum.removeListener(
//                     "accountsChanged",
//                     handleAccountsChanged
//                 );
//         };
//     }, []);

//     return {
//         account: {
//             data: account,
//             isAdmin: isAdmin
//         }
//     };
// };


//        USING SWR
export const handler = web3 => () => {

    const {data, mutate} = useSWR(() =>
        web3 ? "web3/accounts" : null,
        async () => {
            const accounts = await web3.eth.getAccounts()
            const account = accounts[0]
            if(!account) {
              throw new error("Cannot retreive an account. Please refresh th browser.")
            }
            return account
        }
    ) 

  useEffect(() => {
    window.ethereum &&
    window.ethereum.on("accountsChanged",
      accounts => mutate(accounts[0] ?? null)
    )
  }, [])

  return {
    account: {
        data: data,
        isAdmin : (
            data &&
            adminAddress[web3.utils.keccak256(data)]) ?? false,
        mutate: mutate
    }
  }
     
}