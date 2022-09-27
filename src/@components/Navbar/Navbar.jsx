import React from 'react'
import styles from './Navbar.module.css'

import { Link } from "react-router-dom"
import Avatar from '../Avatar/Avatar'

const Navbar = ({ isAuth, onClickLogout, userData, locationName }) => {
   return <nav className={styles.nav}>
      <div className={styles.pageTitle}><h1>{locationName}</h1></div>
      {isAuth
         ? <div>

            <button className={styles.btn} onClick={onClickLogout}><p>LOG OUT</p></button>
            <div className={styles.dropdown}>
               <button className={`${styles.btn} ${styles.dropBtn}`}><p>Menu</p></button>
               <div className={styles.dropdownContent}>
                  <Link to="/">home</Link>
                  <Link to="/my-posts">my posts</Link>
                  <Link to="/my-products">my products</Link>
                  <Link to="/users">users</Link>
                  <Link to={`/profile/${userData._id}`}>profile</Link>
               </div>
            </div>
            <Avatar userData={userData} size='middle' />
         </div>
         :
         <div>
            <Link className={styles.btn} to="/login" ><p>LOG IN</p></Link >
            <Link className={styles.btn} to="/register" ><p>SIGN UP</p></Link >
         </div>
      }
   </nav >
}

export default Navbar