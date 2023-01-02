import React from 'react'
import styles from './Users.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersByName } from '../../redux/slices/usersSlice';
import debounce from "lodash/debounce";
import { useTranslation } from 'react-i18next';
import Header from "@components/Header/Header"
import UserBlock from '@components/UserBlock/UserBlock';
import { InputText } from '@components/Input/Input';

const Users = () => {
   const dispatch = useDispatch()
   const usersData = useSelector((state) => state.users.allUsers.items)
   const [searchText, setSearchText] = React.useState("")
   const { t } = useTranslation()
   const users = usersData.map((item) => <UserBlock {...item} key={item._id} />)

   const handleChange = (e) => {
      const { value } = e.target;
      setSearchText(value)
      handleSearch(value)
   }

   const handleSearch = React.useCallback(
      debounce(value => {
         dispatch(fetchUsersByName(value))
      }, 500)
      , [])

   return (
      <>
         <Header locationName={t("pages.Users")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               <div className={styles.search}>
                  <p>{t("Users.search")}: </p>
                  <InputText onChange={handleChange} value={searchText} placeholder={t("Users.user_name")} />
               </div>
               {users}
            </div>
         </div>\
      </>)
}

export default Users