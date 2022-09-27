import React from 'react'
import styles from './Friends.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useDispatch, useSelector } from 'react-redux';

const Friends = () => {
   const dispatch = useDispatch()

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            page
         </div>
      </div>
   )
}

export default withHeaderHOC(Friends, "friends")