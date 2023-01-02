import React from 'react'
import styles from './Comments.module.css'

import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from '../../redux/slices/commentsSlice';
import { useTranslation } from 'react-i18next';
import Header from "@components/Header/Header"
import Comment from '@components/Comment/Comment';
import WriteComment from '@components/WriteComment/WriteComment';
import CommentSkeleton from '@components/Comment/CommentSkeleton';


const Comments = () => {
   const dispatch = useDispatch()
   const { id } = useParams()
   const items = useSelector(state => state.comments.items)
   const isLoaded = useSelector(state => state.comments.status === "loaded")
   const comments = items.map(item => <Comment key={item._id} {...item} />)
   const { t } = useTranslation()

   React.useEffect(() => {
      if (id) {
         dispatch(fetchComments(id))
      }
   }, [id])

   return (
      <>
         <Header locationName={t("pages.Comments")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               <WriteComment product={id} />
               {isLoaded
                  ? comments
                  : <><CommentSkeleton />
                     <CommentSkeleton /></>}
            </div>
         </div>
      </>
   )
}

export default Comments