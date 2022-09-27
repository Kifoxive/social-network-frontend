import React from 'react'
import styles from "./NoPage.module.css"


const NoPage = () => {
   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h2>Page was not found</h2>
            <big>404</big>
         </div>
      </div>
   )
}

export default NoPage