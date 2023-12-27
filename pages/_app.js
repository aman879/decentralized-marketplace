import { ToastContainer, toast } from 'react-toastify';
import '@styles/globals.css';

import 'react-toastify/dist/ReactToastify.css';
import {Web3Provider} from "@components/providers";

export default function App({ Component, pageProps }) {
  return (
    <Web3Provider>
      <ToastContainer />
      <Component {...pageProps} />
    </Web3Provider>
  )
}