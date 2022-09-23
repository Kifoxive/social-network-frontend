import React from 'react'
import styles from './Product.module.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faComment } from '@fortawesome/free-solid-svg-icons'
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import { InputButton } from '../Input/Input';

const Product = ({
   title, text, imageUrl, tags, commentsCount, createdAt, price, currency, _id, user, isFullProduct
}) => {

   const userData = useSelector((state) => state.auth.data)
   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
   });
   const priceText = formatter.format(price);
   const textFormat = isFullProduct ? text : (text.length > 100 ?
      text.substring(0, 100 - 3) + "..." :
      text)

   const isOwner = (userData?._id === user._id)

   return isFullProduct
      ?
      <div className={styles.productContainer_full}>
         <div className={styles.image_full}>{imageUrl && <img src={`http://localhost:3001${imageUrl}`} alt="product" />}</div>
         <div className={styles.productWrapper_full}>
            <AuthorInfo user={user} createdAt={createdAt} isEditable={isOwner} isRemovable={false} editPath="products" id={_id} />
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
                     <Link to={`/comments/${_id}`}>
                        <FontAwesomeIcon icon={faComment} /> {commentsCount}
                     </Link>
                  </div>
                  <div className={styles.price}><p>{priceText} <span>{currency}</span></p></div>
                  <div className={styles.addToCart}>
                     <InputButton value="add" />
                  </div>
               </div>
            </div>
         </div>
      </div >
      :
      <div className={styles.productContainer}>
         <div className={styles.image}>{imageUrl && <img src={`http://localhost:3001${imageUrl}`} alt="product" />}</div>
         <div className={styles.productWrapper}>
            <div className={styles.title}>
               <h2><Link to={`/products/${_id}`}>{title}</Link></h2>
               {isOwner &&
                  <Link to={`/products/${_id}/edit`} className={styles.editLink}>
                     <FontAwesomeIcon icon={faPencil} />
                  </Link>}
            </div>
            <div className={styles.text}><p>{textFormat}</p></div>
            <div className={styles.price}>
               <p>{priceText} <span>{currency}</span></p></div>
         </div>
      </div >
}

export default Product


