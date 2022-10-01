import React from 'react'
import styles from './Profile.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUser } from '../../redux/slices/usersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faRemove } from '@fortawesome/free-solid-svg-icons'
import Avatar from '@components/Avatar/Avatar';
import { useTranslation } from "react-i18next"

const Profile = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const userData = useSelector((state) => state.users.oneUser.item)
   const myData = useSelector(state => state.auth.data)
   const isLoaded = useSelector(state => state.users.oneUser.status === "loaded")
   const { t } = useTranslation()

   React.useEffect(() => {
      dispatch(fetchOneUser(id))
   }, [id])

   const getDate = (date) => {
      const dateObj = new Date(date)
      return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`
   }
   const date = getDate(userData.createdAt)
   const isEditable = (myData?._id === userData._id)

   return (
      <div
         className={styles.container}>
         <div className={styles.wrapper}>
            {
               isLoaded
                  ? <div className={styles.profileSection}>
                     {isEditable && <Link to={'/profile/edit'} className={styles.editLink}><FontAwesomeIcon icon={faPencil} /></Link>}
                     <div className={styles.avatar}>
                        <Avatar userData={userData} size="big" />
                     </div>
                     <div className={styles.profileInfo}>
                        <div className={styles.fullname}>
                           {userData.fullName}
                        </div>
                        <div className={styles.itemsInfo}>
                           <div className={styles.postsInfo}>
                              <Link to={`/profile/${id}/posts`}>
                                 <p>{t("Profile.posts")}: {userData.postsCount}</p>
                              </Link>
                           </div>
                           <div className={styles.productsInfo}>
                              <Link to={`/profile/${id}/products`}>
                                 <p>{t("Profile.products")}: {userData.productsCount}</p>
                              </Link>
                           </div>
                           <div className={styles.friendsInfo}>
                              <Link to={`/profile/${id}/friends`}>
                                 <p>{t("Profile.friends")}: {userData.friendsCount || 0}</p>
                              </Link>
                           </div>
                        </div>
                        <div className={styles.aboutMe}>
                           {userData.aboutMe}
                        </div>
                        <div className={styles.date}>
                           <span>{t("Profile.joined")}  {date}</span>
                        </div>
                     </div>
                  </div>
                  : <div>Loading...</div>
            }
         </div>
      </div>
   )
}

export default withHeaderHOC(Profile, "profile")