import React from 'react'
import styles from './Posts.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../../redux/slices/postsSlice';
import Post from '@components/Post/Post';
import { useParams } from 'react-router';

const Posts = () => {
   const { id } = useParams()

   const dispatch = useDispatch()
   const postsData = useSelector((state) => state.posts.allPosts.items)
   const posts = postsData.map((item, index) => <Post key={index} {...item}
      isFullPost={false} />);
   React.useEffect(() => {
      dispatch(fetchUserPosts(id))
   }, [])

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {posts.length === 0
               ? <div className={styles.noPosts}>The user have no posts</div> :
               [posts]}
         </div>
      </div>
   )
}

export default withHeaderHOC(Posts, "posts")