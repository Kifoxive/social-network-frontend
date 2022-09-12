import React from 'react'
import styles from './AddPost.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/authSlice'
import { fetchAddImage, fetchOnePost, fetchSendPost, fetchUpdatePost } from '../../redux/slices/postsSlice';
import { InputButton, InputText, InputTextarea } from '../../components/Input/Input';
import { fetchMineProducts } from '../../redux/slices/productsSlice';
import ProductCell from './ProductCell';

const AddPost = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useParams()
   const [text, setText] = React.useState('')
   const [title, setTitle] = React.useState('')
   const [tags, setTags] = React.useState('')
   const [imageUrl, setImageUrl] = React.useState('')
   const [availableProducts, setAvailableProducts] = React.useState([])
   const [showProducts, setShowProducts] = React.useState(false)
   const [selectedProducts, setSelectedProducts] = React.useState({})

   const isAuth = useSelector(selectIsAuth)
   const inputFileRef = React.useRef(null)
   const isEditing = Boolean(id)

   React.useEffect(() => {
      if (id) {
         dispatch(fetchOnePost(id)).then(res => {
            setTitle(res.payload.title)
            setText(res.payload.text)
            setImageUrl(res.payload.imageUrl)
            setTags(res.payload.tags.join(', '))
            console.log(res.payload.selectedProducts);
            const newSelectedProducts = {}
            res.payload.selectedProducts.forEach((item) => {
               newSelectedProducts[item.product._id] = item.product.title
            })
            setSelectedProducts(newSelectedProducts)
         }).catch((e) => {
            console.warn(e)
         })
      }
   }, [id])

   window.state = selectedProducts

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
            title, imageUrl, tags, text, id, selectedProducts: Object.entries(selectedProducts)
         }
         const result = isEditing ? await dispatch(fetchUpdatePost(fields)) : await dispatch(fetchSendPost(fields))
         navigate(`/posts/${result.payload._id}`)
      } catch (err) {
         console.warn(err)
      }
   }
   const onClickRemoveImage = () => {
      setImageUrl('')
   }

   React.useEffect(() => {
      if (isAuth) {
         dispatch(fetchMineProducts()).then(res => {
            setAvailableProducts(res.payload.products)
         })
      }
   }, [isAuth])

   const productsElements = availableProducts.map(elem => <ProductCell key={elem._id} {...elem} toggleProductSelected={toggleProductSelected} isSelected={(Object.keys(selectedProducts).includes(elem._id))} />)

   function toggleProductSelected(productId, productTitle) {
      if (productId in selectedProducts) {
         const { [productId]: [deletedId], ...selectedProductNew } = selectedProducts
         setSelectedProducts(selectedProductNew)
      } else {
         setSelectedProducts({ [productId]: productTitle, ...selectedProducts })
      }
   }

   if (!window.localStorage.getItem('token') && !isAuth) {
      return <Navigate to='/' />
   }

   const getSelectedProductsTitle = (products) => {
      const elems = []
      for (let product in products) {
         elems.push(<p className={styles.selectedTitle} key={product}>{products[product]}</p>)
      }
      return elems
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {
               showProducts
                  ? <div className={styles.selectProductsContainer}>
                     <div className={styles.selectedProductsWrapper}>{productsElements}</div>
                     <InputButton value="back to edit" onClick={() => { setShowProducts(false) }} />
                  </div>
                  : <>
                     <div className={styles.btn}>
                        <button onClick={() => inputFileRef.current.click()}>Add preview</button>
                        {imageUrl && <button onClick={onClickRemoveImage}>Remove preview</button>}
                        <input onChange={handleChangeFile} ref={inputFileRef} type="file" hidden /></div>
                     {imageUrl && <div className={styles.image}>
                        <img src={`http://localhost:3001${imageUrl}`} alt="poster" />
                     </div>}
                     <InputText className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={'title'} />
                     <InputText className={styles.input} value={tags} onChange={(e) => setTags(e.target.value)} placeholder={'tags'} />
                     <InputTextarea value={text} onChange={(e) => setText(e.target.value)} placeholder="type..." />
                     <div className={styles.selectedTitlesContainer}>
                        <p className={styles.productsCounter}>products number: <span>{Object.keys(selectedProducts).length}</span></p>
                        {getSelectedProductsTitle(selectedProducts)}
                     </div>
                     <InputButton value="select products" onClick={() => { setShowProducts(true) }} />
                     <div className={styles.btn}>
                        <button onClick={onSubmit}>{isEditing ? "Update" : "Submit"}</button>
                     </div>
                  </>
            }
         </div>
      </div>
   )
}

export default AddPost  