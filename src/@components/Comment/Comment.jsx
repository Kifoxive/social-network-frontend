import React from 'react'
import styles from './Comment.module.css'
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRemoveComment } from '../../redux/slices/commentsSlice';


const Comment = ({ text, user, product, createdAt, _id }) => {
   const [removeIsDisable, setRemoveIsDisable] = React.useState(false)
   const dispatch = useDispatch()
   const userData = useSelector((state) => state.auth.data)

   const isOwner = (userData._id === user._id)

   const onRemove = async () => {
      setRemoveIsDisable(true)
      await dispatch(fetchRemoveComment({ id: _id, product }))
      setRemoveIsDisable(false)
   }

   return (
      <div className={styles.commentContainer}>
         <AuthorInfo user={user} createdAt={createdAt} isRemovable={isOwner} onRemove={onRemove} removeIsDisable={removeIsDisable} id={user._id} />
         <div className={styles.commentContent}>
            <p>{text}</p>
         </div>
      </div>
   )
}

export default Comment