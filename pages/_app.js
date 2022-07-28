import '../styles/globals.css'
import Cookies from "universal-cookie"
import consts from "../consts"
import App from "next/app"
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
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
