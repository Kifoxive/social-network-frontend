import React from 'react'
import styles from './MyProducts.module.css'
import withHeaderHOC from "@components/Header/Header"

import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMineProducts } from '../../redux/slices/productsSlice';
import { selectIsAuth } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import Product from '@components/Product/Product';

const MyProducts = () => {
   const dispatch = useDispatch()
   const productsData = useSelector((state) => state.products.allProducts.items)
   const isAuth = useSelector(selectIsAuth)
   const { t } = useTranslation()
   const products = productsData.map((item) => <Product isFullItem={false} key={item._id} {...item} />)

   React.useEffect(() => {
      dispatch(fetchMineProducts())
   }, [])

   if (!window.localStorage.getItem('token') && !isAuth) {
      return <Navigate to='/' />
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.addButton}><a href="/add-product">{t("basics.add")}</a></div>
            <div className={styles.productsContainer}>
               {products.length === 0
                  ? <div className={styles.noProducts}>{t("MyProducts.create_new")}</div> :
                  [products]}
            </div>
         </div>
      </div>
   )
}

export default withHeaderHOC(MyProducts, "my products")