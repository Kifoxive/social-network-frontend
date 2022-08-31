import React from "react"
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../../redux/slices/postsSlice';
import { useSelector } from 'react-redux';
import Post from '../../components/Post/Post';
import styles from './Home.module.css'

const Home = () => {
   const dispatch = useDispatch()
   const postsData = useSelector((state) => state.posts.allPosts.items)
   const userData = useSelector((state) => state.auth.data)


   const posts = postsData.map((item, index) => <Post key={index} {...item}
      isEditable={userData?._id === item.user._id} isFullPost={false} />)



   React.useEffect(() => {
      dispatch(fetchPosts())
   }, [])
   return <div className={styles.container}>
      {[posts]}
   </div>
}


export default Home