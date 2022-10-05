import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from '../components/navBar'
import { NavItem } from '../data-types/navItemsInterface'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  const navItems:NavItem[] = [
    {path:'/',title:'Model Warehouse',type:'app-name'},
    {path:'/',title:'Models'},
    {path:'/upload',title:'Upload'}
  ]
  return (
    <>
    <NavBar navItems={navItems} />
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
