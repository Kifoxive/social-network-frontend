import React from 'react'
import styles from './Comment.module.css'
import AuthorInfo from '../AuthorInfo/AuthorInfo';

const Comment = ({ text, user, item, createdAt }) => {

   return (
      <div className={styles.commentContainer}>
         <AuthorInfo user={user} createdAt={createdAt} />
         <div className={styles.commentContent}>
            <p>{text}</p>
         </div>
      </div>
   )
}

export default Comment