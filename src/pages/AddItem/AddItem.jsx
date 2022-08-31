import React from 'react'
import styles from './AddItem.module.css'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/authSlice'
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { fetchAddImage } from '../../redux/slices/postsSlice';
import { fetchOneItem, fetchSendItem, fetchUpdateItem } from '../../redux/slices/itemsSlice'
import { useDispatch } from 'react-redux';
import { InputText } from '../../components/Input/Input';

const AddItem = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useParams()

   const isAuth = useSelector(selectIsAuth)
   const [text, setText] = React.useState('')
   const [title, setTitle] = React.useState('')
   const [tags, setTags] = React.useState('')
   const [imageUrl, setImageUrl] = React.useState('')
   const [price, setPrice] = React.useState('')
   const [currency, setCurrency] = React.useState('')
   const inputFileRef = React.useRef(null)

   const isEditing = Boolean(id)

   React.useEffect(() => {
      if (id) {
         dispatch(fetchOneItem(id)).then(res => {
            setTitle(res.payload.title)
            setText(res.payload.text)
            setImageUrl(res.payload.imageUrl)
            setTags(res.payload.tags.join(', '))
            setPrice(res.payload.price)
            setCurrency(res.payload.currency)
         }).catch((e) => {
            console.warn(e)
         })
      }
   }, [id])

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
            title, imageUrl, tags: tags.split(',').map(item => item.trim()), text, id, price, currency
         }
         const result = isEditing ? await dispatch(fetchUpdateItem(fields)) : await dispatch(fetchSendItem(fields))
         console.log(result.payload);

         navigate(`/items/${result.payload._id}`)
      } catch (err) {
         console.warn(err)
      }
   }

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
            <InputText value={text} placeholder={'text'} onChange={(e) => setText(e.target.value)} />
            <InputText value={tags} placeholder={'tags'} onChange={(e) => setTags(e.target.value)} />
            <InputText value={price} placeholder={'price'} onChange={(e) => setPrice(e.target.value)} />
            <InputText value={currency} placeholder={'currency'} onChange={(e) => setCurrency(e.target.value)} />
            <div className={styles.btn}>
               <button onClick={onSubmit}>{isEditing ? "Update" : "Submit"}</button>
            </div>
         </div>
      </div>
   )
}

export default AddItem