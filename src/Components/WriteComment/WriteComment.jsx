import React from 'react'
import styles from './WriteComment.module.css'
import { InputButton, InputTextarea } from '../Input/Input';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import { fetchComments, fetchSendComment } from '../../redux/slices/commentsSlice';

const WriteComment = ({ product }) => {
   const dispatch = useDispatch()
   const userData = useSelector((state) => state.auth.data)
   const isDisabled = useSelector((state) => state.comments.isDisabled)
   const [text, setText] = React.useState("")

   const onSubmit = async () => {
      try {
         const fields = {
            text, product
         }
         const result = await dispatch(fetchSendComment(fields))
         dispatch(fetchComments(result.payload.product))
         setText('')
      } catch (err) {
         console.warn(err)
      }
   }

   return (
      <div className={styles.writeCommentWrapper}>
         <div className={styles.userInfoContainer}>
            {userData && <Avatar userData={userData} size="small" />}
            {userData && <b>{userData.fullName}</b>}
         </div>
         <div className={styles.inputContainer}>
            <InputTextarea value={text} onChange={(e) => setText(e.target.value)} placeholder="comment text..." />
            <div className={styles.submitButton}>
               <InputButton value="comment" onClick={onSubmit} isDisabled={isDisabled} />
            </div>
         </div>
      </div>
   )
}

export default WriteComment