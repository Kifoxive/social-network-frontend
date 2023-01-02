import React from "react";
import styles from "./FullProduct.module.css";

import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchOneProduct, fetchRemoveProduct } from "../../redux/slices/productsSlice";
import { useTranslation } from 'react-i18next';
import Header from "@components/Header/Header";
import Product from "@components/Product/Product";


const FullProduct = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();
   const productData = useSelector((state) => state.products.oneProduct.item);
   const isLoaded = useSelector(state => state.products.oneProduct.status === 'loaded');
   const userData = useSelector((state) => state.auth.data);
   const isOwner = (userData?.id === productData?.user?.id);
   const { t } = useTranslation();

   const onRemove = async (id) => {
      await dispatch(fetchRemoveProduct(id));
      navigate("/my-products");
   };

   React.useEffect(() => {
      dispatch(fetchOneProduct(id));
   }, [id]);

   return (
      <>
         <Header locationName={t("pages.FullProduct")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               {isLoaded ? <Product {...productData} isFullProduct={true} /> : <div>Loading....</div>}
               {isOwner && <div className={styles.deleteButton}><button onClick={() => onRemove(id)}>{t("FullProduct.remove_product")}</button></div>}
            </div>
         </div>
      </>
   );
};

export default FullProduct;