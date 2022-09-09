import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/authSlice'
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import styles from './AddPost.module.css'
import { fetchAddImage, fetchOnePost, fetchSendPost, fetchUpdatePost } from '../../redux/slices/postsSlice';
import { useDispatch } from 'react-redux';
import { InputButton, InputText, InputTextarea } from '../../components/Input/Input';
import { fetchMineItems } from '../../redux/slices/itemsSlice';
import ItemCell from './ItemCell';

const AddPost = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useParams()
   const [text, setText] = React.useState('')
   const [title, setTitle] = React.useState('')
   const [tags, setTags] = React.useState('')
   const [imageUrl, setImageUrl] = React.useState('')
   const [availableItems, setAvailableItems] = React.useState([])
   const [showItems, setShowItems] = React.useState(false)
   const [selectedItems, setSelectedItems] = React.useState({})

   const isAuth = useSelector(selectIsAuth)
   const inputFileRef = React.useRef(null)
   const isEditing = Boolean(id)

   React.useEffect(() => {
      let i = 0
      if (id) {
         dispatch(fetchOnePost(id)).then(res => {
            setTitle(res.payload.title)
            setText(res.payload.text)
            setImageUrl(res.payload.imageUrl)
            setTags(res.payload.tags.join(', '))
            console.log(res.payload.selectedItems);
            const newSelectedItems = {}
            res.payload.selectedItems.forEach((item) => {
               newSelectedItems[item.item._id] = item.title
            })
            setSelectedItems(newSelectedItems)
         }).catch((e) => {
            console.warn(e)
         })
      }
   }, [id])

   window.state = selectedItems

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
            title, imageUrl, tags, text, id, selectedItems: Object.entries(selectedItems)
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
         dispatch(fetchMineItems()).then(res => {
            setAvailableItems(res.payload.items)
         })
      }
   }, [isAuth])

   const itemsElements = availableItems.map(elem => <ItemCell key={elem._id} {...elem} toggleItemSelected={toggleItemSelected} isSelected={(Object.keys(selectedItems).includes(elem._id))} />)

   function toggleItemSelected(itemId, itemTitle) {
      if (itemId in selectedItems) {
         const { [itemId]: [deletedId], ...selectedItemNew } = selectedItems
         setSelectedItems(selectedItemNew)
      } else {
         setSelectedItems({ [itemId]: itemTitle, ...selectedItems })
      }
   }

   if (!window.localStorage.getItem('token') && !isAuth) {
      return <Navigate to='/' />
   }

   const getSelectedItemsTitle = (items) => {
      const elems = []
      for (let item in items) {
         elems.push(<p className={styles.selectedTitle} key={item}>{items[item]}</p>)
      }
      return elems
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {
               showItems
                  ? <div className={styles.selectItemsContainer}>
                     <div className={styles.selectItemsWrapper}>{itemsElements}</div>
                     <InputButton value="back to edit" onClick={() => { setShowItems(false) }} />
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
                        <p className={styles.itemsCounter}>items number: <span>{Object.keys(selectedItems).length}</span></p>
                        {getSelectedItemsTitle(selectedItems)}
                     </div>
                     <InputButton value="select items" onClick={() => { setShowItems(true) }} />
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