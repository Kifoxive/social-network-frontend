import React from 'react'
import styles from './Avatar.module.css'
import cls from 'classnames'

const Avatar = ({ userData, size = "small" }) => {
   return <div>
      {userData.avatarUrl
         ? <img className={cls([styles[size]], styles.avatar)} src={userData.avatarUrl} alt='avatar' />
         : <div className={cls([styles[size]], styles.avatar)}><p>{userData.fullName[0]}</p></div>
      }
   </div>
}

export default Avatar