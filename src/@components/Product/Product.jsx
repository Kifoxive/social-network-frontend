import React from 'react';
import styles from './Product.module.css';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faComment } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import { InputButton } from '../Input/Input';
import { API_URL } from '../../api/api';

const Product = ({
   title, text, imageUrl, tags, commentsCount, createdAt, price, currency, id, user, isFullProduct
}) => {

   const { t } = useTranslation();
   const userData = useSelector((state) => state.auth.data);
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
   });
   const priceText = formatter.format(price);
   const textFormat = isFullProduct ? text : (text.length > 100 ?
      text.substring(0, 100 - 3) + "..." :
      text);

   // when it isn`t a full version of the product, we don`t have to know all information about product, such as user.id,
   // only user (user is a product`s owner user.id)
   const isOwner = (isFullProduct) ? (userData?.id === user.id) : (userData?.id === user);


   return (
      isFullProduct
         ?
         <div className={styles.productContainer_full}>
            <div className={styles.image_full}>{imageUrl && <img src={`${API_URL}${imageUrl}`} alt="product" />}</div>
            <div className={styles.productWrapper_full}>
               <AuthorInfo user={user} createdAt={createdAt} isEditable={isOwner} isRemovable={false} editPath="products" id={id} />
               <div className={`${styles.tittle_full} ${styles.title}`}>
                  <h2>{title}</h2>
               </div>
               <div className={`${styles.text_full} ${styles.text}`}><p>{textFormat}</p></div>
               <div className={styles.bottomSide}>
                  <div className={styles.tags}>{
                     tags.map((item, index) => <i key={index}><Link to={`/tags/${item}`}>#{item}</Link></i>)
                  }</div>
                  <div className={styles.paymentInfo}>
                     <div className={styles.comments}>
                        <Link to={`/comments/${id}`}>
                           <FontAwesomeIcon icon={faComment} /> {commentsCount}
                        </Link>
                     </div>
                     <div className={styles.price}><p>{priceText} <span>{currency}</span></p></div>
                     <div className={styles.addToCart}>
                        <InputButton value={t("basics.add")} />
                     </div>
                  </div>
               </div>
            </div>
         </div >
         :
         <div className={styles.productContainer}>
            <div className={styles.image}>{imageUrl && <img src={`${API_URL}${imageUrl}`} alt="product" />}</div>
            <div className={styles.productWrapper}>
               <div className={styles.title}>
                  <h2><Link to={`/products/${id}`}>{title}</Link></h2>
                  {isOwner &&
                     <Link to={`/products/${id}/edit`} className={styles.editLink}>
                        <FontAwesomeIcon icon={faPencil} />
                     </Link>}
               </div>
               <div className={styles.text}><p>{textFormat}</p></div>
               <div className={styles.price}>
                  <p>{priceText} <span>{currency}</span></p></div>
            </div>
         </div >
   );
};

export default Product;


