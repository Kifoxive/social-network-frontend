import React from 'react'
import styles from './Users.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersByName } from '../../redux/slices/usersSlice';
import UserBlock from '@components/UserBlock/UserBlock';
import { InputText } from '@components/Input/Input';
import debounce from "lodash/debounce";

const Users = () => {
   const dispatch = useDispatch()
   const usersData = useSelector((state) => state.users.allUsers.items)
   const [searchText, setSearchText] = React.useState("")

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

   return (<div className={styles.container}>
      <div className={styles.wrapper}>
         <div className={styles.search}>
            <p>search:  </p>
            <InputText onChange={handleChange} value={searchText} placeholder="first name..." />
         </div>
         {users}
      </div>
   </div>)
}

export default withHeaderHOC(Users, "users")