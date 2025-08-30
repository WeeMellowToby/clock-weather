import '../styles/globals.css'
import Cookies from "universal-cookie"
import consts from "../consts"
import App from "next/app"
import { UserContext, useUserData } from './lib/context'
function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  return <UserContext.Provider value={userData}><Component {...pageProps} /></UserContext.Provider>
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  const cookies = new Cookies(appContext.ctx.req.headers.cookie)
  const password = cookies.get(consts.SiteReadCookie) ?? ""

  if (password === process.env.NEXT_PUBLIC_PASSWORD) {
    appProps.pageProps.hasReadPermission = true
  }

  return { ...appProps }
}
export default MyApp
