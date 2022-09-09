import React from 'react'
import styles from './AuthorInfo.module.css'
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faRemove } from '@fortawesome/free-solid-svg-icons'
import cls from 'classnames'


const AuthorInfo = ({
   user, createdAt, isEditable, id, path, onRemove, isRemovable, removeIsDisable
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
               <div className={styles.date}><span>{date}</span></div>
            </div>
         </div>
         <div className={styles.actionsSide}>
            {isEditable && <Link to={`/${path}/${id}/edit`} className={styles.editLink}><FontAwesomeIcon icon={faPencil} /></Link>}
            {isRemovable && <button disabled={removeIsDisable} className={cls({ [styles.buttonDisabled]: removeIsDisable }, styles.removeButton)} onClick={onRemove}><FontAwesomeIcon icon={faRemove} /></button>}
         </div>
      </div>
   )
}

export default AuthorInfo