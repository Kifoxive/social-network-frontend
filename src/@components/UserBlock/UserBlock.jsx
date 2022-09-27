import React from 'react'
import styles from './UserBlock.module.css'

import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

const UserBlock = ({ fullName, avatarUrl, _id }) => {

   return (<div className={styles.userBlockContainer}>
      <div className={styles.userBlockWrapper}>
         <Link to={`/profile/${_id}`}>
            <Avatar userData={{ avatarUrl, fullName }} size="middle" />
            <div className={styles.fullName}>
               <p>{fullName}</p>
            </div>
         </Link>
      </div>
   </div>)
}

export default UserBlock