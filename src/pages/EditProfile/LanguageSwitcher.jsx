import React from 'react'
import styles from './LanguageSwitcher.module.css'

import { useTranslation } from "react-i18next"

const LanguageSwitcher = () => {
   const { t, i18n } = useTranslation()
   const languages = {
      "gb": "English",
      "cz": "Czech",
      "ua": "Ukrainian"
   }
   const availableLanguages = Object.keys(languages).filter(lang => lang !== i18n.language)

   const changeLanguage = (lang) => {
      i18n.changeLanguage(lang)
   }

   return (
      <div className={styles.lang_menu}>
         <div className={styles.selectLanguage__title}>{t("EditProfile.change_language")}:</div>
         <div className={styles.languages_list}>
            <p className={`${styles.selected_lang} ${styles.list_item}`}>
               <button>
                  <img src={`https://www.countryflagicons.com/FLAT/32/${i18n.language.toUpperCase()}.png`} alt={i18n.language} />
                  <span>{t(`EditProfile.lang.${i18n.language}`)}</span>
               </button>
            </p>
            <ul>
               {availableLanguages.map((lang, index) => <li key={index} className={styles.list_item}>
                  <button onClick={() => changeLanguage(lang)}>
                     <img src={`https://www.countryflagicons.com/FLAT/32/${lang.toUpperCase()}.png`} alt={lang} />
                     <span>{t(`EditProfile.lang.${lang}`)}</span>
                  </button>
               </li>)}
            </ul>
         </div>
      </div>
   )
}

export default LanguageSwitcher