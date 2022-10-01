import React from 'react'
import styles from './Navbar.module.css'

import { useTranslation } from "react-i18next"
import "../../utils/i18next"
import { Link } from "react-router-dom"
import Avatar from '../Avatar/Avatar'

const Navbar = ({ isAuth, onClickLogout, userData, locationName }) => {
   const { t } = useTranslation()

   return <nav className={styles.nav}>
      <div className={styles.pageTitle}><h1>{locationName}</h1></div>
      {isAuth
         ? <div>

            <button className={styles.btn} onClick={onClickLogout}><p>{t("Navbar.logout")}</p></button>
            <div className={styles.dropdown}>
               <button className={`${styles.btn} ${styles.dropBtn}`}><p>{t("Navbar.menu")}</p></button>
               <div className={styles.dropdownContent}>
                  <Link to="/">{t("Navbar.menu-list.home")}</Link>
                  <Link to="/my-posts">{t("Navbar.menu-list.my_posts")}</Link>
                  <Link to="/my-products">{t("Navbar.menu-list.my_products")}</Link>
                  <Link to="/users">{t("Navbar.menu-list.users")}</Link>
                  <Link to={`/profile/${userData._id}`}>{t("Navbar.menu-list.profile")}</Link>
               </div>
            </div>
            <Avatar userData={userData} size='middle' />
         </div>
         :
         <div>
            <Link className={styles.btn} to="/login" ><p>{t("Navbar.login")}</p></Link >
            <Link className={styles.btn} to="/register" ><p>{t("Navbar.signup")}</p></Link >
         </div>
      }
   </nav >
}

export default Navbar