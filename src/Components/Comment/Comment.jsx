import React from 'react'
import styles from './Comment.module.css'
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import { useDispatch } from 'react-redux';
import { fetchRemoveComment } from '../../redux/slices/commentsSlice';


const Comment = ({ text, user, item, createdAt, _id }) => {
   const [removeIsDisable, setRemoveIsDisable] = React.useState(false)
   const dispatch = useDispatch()

   const onRemove = () => {
      dispatch(fetchRemoveComment({ id: _id, item }))
      setRemoveIsDisable(true)
   }

   return (
      <div className={styles.commentContainer}>
         <AuthorInfo user={user} createdAt={createdAt} onRemove={onRemove} isRemovable={true} removeIsDisable={removeIsDisable} />
         <div className={styles.commentContent}>
            <p>{text}</p>
         </div>
      </div>
   )
}

export default Comment