import React from 'react'
import styles from './FullPost.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { fetchOnePost } from "../../redux/slices/postsSlice"
import Post from './Post';

const FullPost = () => {
   const dispatch = useDispatch()
   const userData = useSelector((state) => state.auth.data)
   const postData = useSelector((state) => state.posts.onePost.item)
   const isLoaded = useSelector((state) => state.posts.onePost.status === "loaded")
   const { id } = useParams()

   React.useEffect(() => {
      dispatch(fetchOnePost(id))
   }, [id])

   return (isLoaded
      ? <div className={styles.fullPostContainer}>
         <div className={styles.fullPostWrapper}><Post {...postData}
            isEditable={userData?._id === postData.user._id} isFullPost={true} /></div>
      </div>
      : <div>Loading...</div>)
}



export default withHeaderHOC(FullPost, "post")
