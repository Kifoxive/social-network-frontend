import React from 'react'
import styles from './MyPosts.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useDispatch, useSelector } from 'react-redux';
import { fetchMinePosts } from '../../redux/slices/postsSlice';
import { useTranslation } from 'react-i18next';
import Post from '@components/Post/Post';

const MyPosts = () => {
   const dispatch = useDispatch()
   const postsData = useSelector((state) => state.posts.myPosts.items)
   const userData = useSelector((state) => state.auth.data)
   const { t } = useTranslation()
   const posts = postsData.map((item, index) => <Post key={index} {...item}
      isEditable={userData?._id === item.user._id} isFullPost={false} />)

   React.useEffect(() => {
      dispatch(fetchMinePosts())
   }, [])

   return (
      <div
         className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.addButton}><a href="/add-post">{t("basics.add")}</a></div>
            <div className={styles.posts}>
               {posts.length === 0
                  ? <div className={styles.noPosts}>{t("MyPosts.create_new")}</div> :
                  [posts]}
            </div>
         </div>
      </div>
   )
}

export default withHeaderHOC(MyPosts, "my posts")