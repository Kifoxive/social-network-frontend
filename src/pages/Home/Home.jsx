import React from "react"
import styles from './Home.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../../redux/slices/postsSlice';
import Post from '@components/Post/Post';

const Home = () => {
   const dispatch = useDispatch()
   const postsData = useSelector((state) => state.posts.allPosts.items)
   const posts = postsData.map((item, index) => <Post key={index} {...item}
      isFullPost={false} />)

   React.useEffect(() => {
      dispatch(fetchPosts())
   }, [])

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>{[posts]}</div>
      </div>
   )
}


export default withHeaderHOC(Home, "home")