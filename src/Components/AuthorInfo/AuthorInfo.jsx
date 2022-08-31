import React from 'react'
import styles from './AuthorInfo.module.css'
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons'


const AuthorInfo = ({
   user, createdAt, isEditable, id, path
}) => {


   const getDate = (date) => {
      const dateObj = new Date(date)
      return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`
   }
   const date = getDate(createdAt)

   return (
      <div className={styles.authorInfo}>
         <div className={styles.contentSide}>
            <Avatar userData={user} size='small' />
            <div className={styles.authorPostData}>
               <div><b className={styles.authorName}>{user.fullName}</b></div>
               <div><span className={styles.date}>{date}</span></div>
            </div>
         </div>
         {isEditable && <Link to={`/${path}/${id}/edit`} className={styles.editLink}><FontAwesomeIcon icon={faPencil} /></Link>}
      </div>
   )
}

export default AuthorInfo