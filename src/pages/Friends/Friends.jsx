import React from 'react'
import styles from './Friends.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Header from "@components/Header/Header"

const Friends = () => {
   const dispatch = useDispatch()
   const { t } = useTranslation()

   return (
      <>
         <Header locationName={t("pages.Friends")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               page
            </div>
         </div>
      </>
   )
}

export default Friends