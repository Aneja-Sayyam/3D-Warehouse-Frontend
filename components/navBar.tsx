import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { NavItem } from '../data-types/navItemsInterface'
import styles from '../styles/navbar.module.css'

interface Props{
    navItems:NavItem[]
}

const NavBar = ({navItems}:Props) => {
    const router = useRouter()
    const getClassNames = (path:string,type?:string)=>{
        const classes = [`${styles.navItem}`]
        const currentRoute = router.asPath
        if(path===currentRoute && !type){
            classes.push(`${styles.active}`)
        }else if(type==='app-name'){
            classes.push(`${styles.appName}`)
        }
        return classes.join(' ')
    }

  return (
    <div className={styles.container}>
        {navItems.map(({path,title,type})=>(
            <NavItem key={title} className={getClassNames(path,type)} path={path} title={title} type={type}   />
        ))}
    </div>
  )
}

interface NavItemProps extends NavItem{
    className:string
}

const NavItem = (Props:NavItemProps)=>{
    return(
        <Link href={Props.path}>
            <div className={Props.className}>{Props.title}</div>
        </Link>
    )
}


export default NavBar