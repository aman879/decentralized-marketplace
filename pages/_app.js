import '@styles/globals.css'
import {Web3Provider} from "@components/providers";

export default function App({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  )
}