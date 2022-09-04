import React from 'react'
import styles from './Comment.module.css'

const CommentSkeleton = () => {

   return (
      <div className={styles.skeletonCommentContainer}>
         <div className={styles.skeletonInfo}>
            <div className={styles.skeletonSquare}>
            </div>
            <div className={styles.skeletonCommentData}>
               <div></div>
               <div></div>
            </div>
         </div>
         <div className={styles.skeletonContent}>
            <div className={styles.skeletonText}></div>
         </div>
      </div>
   )
}

export default CommentSkeleton