import React from "react"
import styles from "./FullProduct.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { fetchOneProduct, fetchRemoveProduct } from "../../redux/slices/productsSlice";
import Product from "../../components/Product/Product";


const FullProduct = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useParams()
   const productData = useSelector((state) => state.products.currentProduct.item)
   const isLoaded = useSelector(state => state.products.currentProduct.status === 'loaded')
   const userData = useSelector((state) => state.auth.data)
   const isOwner = (userData?._id === productData?.user?._id)

   const onRemove = async (id) => {
      await dispatch(fetchRemoveProduct(id))
      navigate("/my-products")
   }

   React.useEffect(() => {
      dispatch(fetchOneProduct(id))
   }, [id])

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {isLoaded ? <Product {...productData} isFullProduct={true} /> : <div>Loading</div>}
            {isOwner && <div className={styles.deleteButton}><button onClick={() => onRemove(id)}>delete product</button></div>}
         </div>
      </div>
   )
}

export default FullProduct