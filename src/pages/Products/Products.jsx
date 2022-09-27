import React from 'react'
import styles from './Products.module.css'
import withHeaderHOC from "@components/Header/Header"

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../../redux/slices/productsSlice';
import { useParams } from 'react-router';
import Product from '@components/Product/Product';

const Products = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const productsData = useSelector((state) => state.products.allProducts.items)
   console.log(productsData);
   const products = productsData.map((item) => <Product isFullItem={false} key={item._id} {...item} />)

   React.useEffect(() => {
      dispatch(fetchUserProducts(id))
   }, [])

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {products.length === 0 ?
               <div className={styles.noProducts}>The user have no products</div>
               : [products]}
         </div>
      </div>
   )
}

export default withHeaderHOC(Products, "products")