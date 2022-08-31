import React from 'react'
import { Link } from "react-router-dom"
import Avatar from '../Avatar/Avatar'
import styles from './Navbar.module.css'


const Navbar = (props) => {

   return <nav className={styles.nav}>
      {props.isAuth
         ? <div>
            <button className={styles.btn} onClick={props.onClickLogout}><p>LOG OUT</p></button>
            <div className={styles.dropdown}>
               <button className={`${styles.btn} ${styles.dropBtn}`}><p>Menu</p></button>
               <div className={styles.dropdownContent}>
                  <Link to="/">home</Link>
                  <Link to="/add-post">create post</Link>
                  <Link to="/my-items">my items</Link>
               </div>
            </div>
            <Avatar userData={props.userData} size='middle' />
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