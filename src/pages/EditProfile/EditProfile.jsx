import React from 'react'
import styles from './EditProfile.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { InputText } from '@components/Input/Input';
import { selectIsAuth } from '../../redux/slices/authSlice';
import { fetchUpdateUser } from '../../redux/slices/usersSlice';
import { fetchAddImage } from '../../redux/slices/postsSlice';





const EditProfile = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const inputFileRef = React.useRef()
   const isAuth = useSelector(selectIsAuth)
   const myData = useSelector((state) => state.auth.data)

   const [fullName, setFullName] = React.useState('')
   const [email, setEmail] = React.useState('')
   const [aboutMe, setAboutMe] = React.useState('')
   const [avatarUrl, setImageUrl] = React.useState('')


   const handleChangeFile = async (event) => {
      try {
         const formData = new FormData()
         const file = event.target.files[0]
         formData.append('image', file)

         const result = await dispatch(fetchAddImage(formData))
         setImageUrl(result.payload.url)
      } catch (err) {
         console.warn(err)
      }
   }

   const onSubmit = async () => {
      const fields = {
         fullName, email, aboutMe, avatarUrl
      }
      const result = await dispatch(fetchUpdateUser(fields))
      navigate(`/profile/${result.payload._id}`)
   }

   React.useEffect(() => {
      if (isAuth) {
         setFullName(myData.fullName)
         setEmail(myData.email)
         setAboutMe(myData.aboutMe)
         setImageUrl(myData.avatarUrl)
      }
   }, [isAuth])

   const onClickRemoveImage = () => {
      setImageUrl('')
   }

   if (!window.localStorage.getItem('token') && !isAuth) {
      return <Navigate to='/' />
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.btn}>
               <button onClick={() => inputFileRef.current.click()}>Add avatar</button>
               {avatarUrl && <button onClick={onClickRemoveImage}>Remove preview</button>}
               <input onChange={handleChangeFile} ref={inputFileRef} type="file" hidden />
            </div>

            <div className={styles.content}>
               {avatarUrl && <div className={styles.image}>
                  <img src={`http://localhost:3001${avatarUrl}`} alt="avatar" />
               </div>}
               <div className={styles.inputs}>
                  <InputText className={styles.input} value={fullName} placeholder="your name" onChange={(e) => setFullName(e.target.value)} />
                  <InputText className={styles.input} value={email} placeholder="your email" onChange={(e) => setEmail(e.target.value)} />
                  <InputText className={styles.input} value={aboutMe} placeholder="tell abour yourself" onChange={(e) => setAboutMe(e.target.value)} />
               </div>
            </div>

            <div className={styles.btn}>
               <button onClick={onSubmit}>Update</button>
            </div>
         </div>
      </div>
   )
}

export default withHeaderHOC(EditProfile, "edit profile")