import React from 'react'
import styles from './Item.module.css'

const Item = ({
   title, text, imageUrl, createdAt, tags, comments, _id, user
}) => {
   return (
      <div className={styles.itemContainer}>
         <div className={styles.image}><img src={`http://localhost:3001${imageUrl}`} alt="item" /></div>
         <div className={styles.itemWrapper}>
            <div className={styles.title}><h3>{title}</h3></div>
            <div className={styles.text}><p>{text}</p></div>

         </div>
      </div>
   )
}

export default Item