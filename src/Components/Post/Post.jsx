import React from 'react'
import styles from './Post.module.css'
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux';
import { fetchRemovePost } from '../../redux/slices/postsSlice';
import Avatar from '../Avatar/Avatar';
import AuthorInfo from '../AuthorInfo/AuthorInfo';

const Post = ({
   _id,
   title,
   createdAt,
   imageUrl,
   user,
   viewsCount,
   commentsCount,
   tags,
   children,
   isFullPost,
   isLoading,
   isEditable,
   text,
}) => {
   const dispatch = useDispatch()

   const onClickRemove = () => {
      dispatch(fetchRemovePost(_id))
   }



   const getDate = (date) => {
      const dateObj = new Date(date)
      return `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`
   }
   const date = getDate(createdAt)

   return (
      <div className={styles.postContainer}>
         <div className={styles.postWrapper}>
            {imageUrl && <div className={styles.image}><img src={`http://localhost:3001${imageUrl}`} alt="post" /></div>}
            <div className={styles.postContent}>
               <AuthorInfo user={user} createdAt={createdAt} isEditable={isEditable} path="posts" id={_id} />
               <div className={styles.content}>
                  <div className={styles.title}>
                     <h2>{isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}</h2>
                  </div>

                  {isFullPost && <div className={styles.text}><span><ReactMarkdown children={text} id={12} /></span></div>}
                  <div className={styles.views}><span>{viewsCount}</span></div>
               </div>
            </div>
         </div>
      </div >
   )
}

export default Post