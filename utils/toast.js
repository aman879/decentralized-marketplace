import { toast } from 'react-toastify';

export const withToast = (promise) => {
    toast.promise(
        promise,
        {
        pending: {
            render(){
            return "Your transaction is being processed"
            },
            icon: true,
        },
        success: {
            render({data}){
                return (
                    <div>
                      Payment successful,<br />
                      Tx: {data.transactionHash.slice(0, 7)}...
                    </div>
                  )
            },
            // other options
            icon: "🟢",
        },
        error: {
            render({data}){
            // When the promise reject, data will contains the error
            return <div>{data.message ?? "Transaction has failed"}</div>
            }
        }
        }
    )
}