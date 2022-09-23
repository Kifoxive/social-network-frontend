import React from 'react'
import styles from './Profile.module.css'

import { useParams } from 'react-router';
import { fetchOneUser } from '../../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../components/Avatar/Avatar';

const Profile = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const userData = useSelector((state) => state.users.oneUser.item)
   const isLoaded = useSelector(state => state.users.oneUser.status === "loaded")

   React.useEffect(() => {
      dispatch(fetchOneUser(id))
   }, [id])

   const getDate = (date) => {
      const dateObj = new Date(date)
      return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`
   }
   const date = getDate(userData.createdAt)

   return (
      <div
         className={styles.container}>
         <div className={styles.wrapper}>
            {
               isLoaded
                  ? <div className={styles.profileSection}>
                     <Avatar userData={userData} size="big" />
                     <div className={styles.profileInfo}>
                        <div className={styles.fullname}>
                           {userData.fullName}
                        </div>
                        <div className={styles.date}>
                           <span>joined  {date}</span>
                        </div>
                     </div>
                  </div>
                  : <div>Loading...</div>
            }
         </div>
      </div>
   )
}

export default Profile