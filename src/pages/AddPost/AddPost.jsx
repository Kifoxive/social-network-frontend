import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/authSlice'
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor'
import styles from './AddPost.module.css'
import { fetchAddImage, fetchOnePost, fetchSendPost, fetchUpdatePost } from '../../redux/slices/postsSlice';
import { useDispatch } from 'react-redux';

const AddPost = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useParams()

   const isAuth = useSelector(selectIsAuth)
   const [text, setText] = React.useState('')
   const [title, setTitle] = React.useState('')
   const [tags, setTags] = React.useState('')
   const [imageUrl, setImageUrl] = React.useState('')
   const inputFileRef = React.useRef(null)

   const isEditing = Boolean(id)

   React.useEffect(() => {
      if (id) {
         dispatch(fetchOnePost(id)).then(res => {
            setTitle(res.payload.title)
            setText(res.payload.text)
            setImageUrl(res.payload.imageUrl)
            setTags(res.payload.tags.join(','))
         }).catch((e) => {
            console.warn(e)
         })
      }
   }, [id])

   const onChange = React.useCallback((value) => {
      setText(value)
   }, [])

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
      try {
         const fields = {
            title, imageUrl, tags, text, id
         }
         const result = isEditing ? await dispatch(fetchUpdatePost(fields)) : await dispatch(fetchSendPost(fields))

         navigate(`/posts/${result.payload._id}`)
         // navigate(`/posts/${result.meta.arg.id}`)
      } catch (err) {
         console.warn(err)
      }
   }

   const onClickRemoveImage = () => {
      setImageUrl('')
   }

   const options = React.useMemo(() => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'type...',
      status: false,
      autosave: {
         enabled: true,
         delay: 1000
      }
   }), [])

   if (!window.localStorage.getItem('token') && !isAuth) {
      return <Navigate to='/' />
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.btn}>
               <button onClick={() => inputFileRef.current.click()}>Add preview</button>
               {imageUrl && <button onClick={onClickRemoveImage}>Remove preview</button>}
               <input onChange={handleChangeFile} ref={inputFileRef} type="file" hidden /></div>
            {imageUrl && <div className={styles.image}>
               <img src={`http://localhost:3001${imageUrl}`} alt="poster" />
            </div>}
            <div className={styles.title}>
               <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'title of article...'}
                  type="text" />
            </div>
            <div className={styles.tags}>
               <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder={'tags'} type="text" />
            </div>
            <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
            <div className={styles.btn}>
               <button onClick={onSubmit}>{isEditing ? "Update" : "Submit"}</button>
            </div>
         </div>
      </div>
   )
}

export default AddPost  