import React from 'react'
import { Link } from "react-router-dom"
import Avatar from '../Avatar/Avatar'
import styles from './Navbar.module.css'


const Navbar = (props) => {

   return <nav className={styles.nav}>
      {props.isAuth
         ? <div>
            <button className={styles.btn} onClick={props.onClickLogout}>LOG OUT</button>
            {/* <label htmlFor="menuItems">menu</label>
            <select name='menuItems' id="menuItems">
               <option value="createPost"><Link className={styles.btn} to="/add-post"><p>Create post</p></Link></option>
            </select> */}
            <div className={styles.dropdown}>
               <button className={`${styles.dropbtn} ${styles.btn}`}>Menu</button>
               <div className={styles.dropdownContent}>
                  <Link to="/add-post">profile</Link>
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