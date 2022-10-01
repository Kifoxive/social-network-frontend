import React from 'react'
import styles from './Posts.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../../redux/slices/postsSlice';
import { useTranslation } from 'react-i18next';
import Post from '@components/Post/Post';

const Posts = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const postsData = useSelector((state) => state.posts.allPosts.items)
   const { t } = useTranslation()
   const posts = postsData.map((item, index) => <Post key={index} {...item}
      isFullPost={false} />);
   React.useEffect(() => {
      dispatch(fetchUserPosts(id))
   }, [])

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {posts.length === 0
               ? <div className={styles.noPosts}>{t("Posts.no_posts")}</div> :
               [posts]}
         </div>
      </div>
   )
}

export default withHeaderHOC(Posts, "posts")