import React from 'react'
import styles from './AddProduct.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/authSlice'
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { fetchAddImage } from '../../redux/slices/postsSlice';
import { fetchOneProduct, fetchSendProduct, fetchUpdateProduct } from '../../redux/slices/productsSlice'
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next"
import { InputText } from '@components/Input/Input';

const AddProduct = () => {
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
   const { t } = useTranslation()

   const isEditing = Boolean(id)

   React.useEffect(() => {
      if (id) {
         dispatch(fetchOneProduct(id)).then(res => {
            setTitle(res.payload.product.title)
            setText(res.payload.product.text)
            setImageUrl(res.payload.product.imageUrl)
            setTags(res.payload.product.tags.join(', '))
            setPrice(res.payload.product.price)
            setCurrency(res.payload.product.currency)
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
         const result = isEditing ? await dispatch(fetchUpdateProduct(fields)) : await dispatch(fetchSendProduct(fields))

         navigate(`/products/${result.payload._id}`)
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
               <button onClick={() => inputFileRef.current.click()}>{t("basics.add_preview")}</button>
               {imageUrl && <button onClick={onClickRemoveImage}>{t("basics.remove_preview")}</button>}
               <input onChange={handleChangeFile} ref={inputFileRef} type="file" hidden />
            </div>
            {imageUrl && <div className={styles.image}>
               <img src={`http://localhost:3001${imageUrl}`} alt="poster" />
            </div>}
            <InputText className={`${styles.title} ${styles.input}`} value={title} placeholder={t("placeholders.title")} onChange={(e) => setTitle(e.target.value)} />
            <InputText className={styles.input} value={text} placeholder={t("placeholders.description")} onChange={(e) => setText(e.target.value)} />
            <InputText className={styles.input} value={tags} placeholder={t("placeholders.tags")} onChange={(e) => setTags(e.target.value)} />
            <InputText className={styles.input} value={price} placeholder={t("AddProduct.price")} onChange={(e) => setPrice(e.target.value)} />
            <InputText className={styles.input} value={currency} placeholder={t("AddProduct.currency")} onChange={(e) => setCurrency(e.target.value)} />
            <div className={styles.btn}>
               <button onClick={onSubmit}>{isEditing ? t("basics.update") : t("basics.submit")}</button>
            </div>
         </div>
      </div>
   )
}

export default withHeaderHOC(AddProduct, "add product")