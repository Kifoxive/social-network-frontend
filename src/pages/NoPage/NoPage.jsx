import React from 'react'
import styles from "./NoPage.module.css"

import { useTranslation } from 'react-i18next';
import Header from '@components/Header/Header';


const NoPage = () => {
   const { t } = useTranslation()
   return (
      <>
         <Header locationName={t("pages.NoPage")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               <h2>{t("NoPage.not_found")}</h2>
               <big>404</big>
            </div>
         </div>
      </>
   )
}

export default NoPage