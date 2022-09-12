import React from 'react'
import styles from './MyPosts.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMinePosts } from '../../redux/slices/postsSlice';
import Post from '../../components/Post/Post';

const MyPosts = () => {
   const dispatch = useDispatch()
   const postsData = useSelector((state) => state.posts.myPosts.items)
   const userData = useSelector((state) => state.auth.data)
   const posts = postsData.map((item, index) => <Post key={index} {...item}
      isEditable={userData?._id === item.user._id} isFullPost={false} />)

   React.useEffect(() => {
      dispatch(fetchMinePosts())
   }, [])

   return (
      <div
         className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.addButton}><a href="/add-post">add</a></div>
            <div className={styles.posts}>{posts}</div>
         </div>
      </div>
   )
}

export default MyPosts