import React from 'react'
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

   return isLoaded ? <Post {...postData}
      isEditable={userData?._id === postData.user._id} isFullPost={true} /> : <div>Loading</div>
}

export default FullPost
