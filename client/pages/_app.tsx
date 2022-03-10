import { AppProps } from "next/dist/shared/lib/router/router"
import "@material-tailwind/react/tailwind.css";
import '../styles/globals.css';
import { Provider } from 'react-redux'
import store from '../components/store'

function MyApp({ Component, pageProps, }: AppProps) {
  return <Provider store={store}><Component {...pageProps} /></Provider>
}

export default MyApp
