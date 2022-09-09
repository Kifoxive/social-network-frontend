import React from 'react'
import styles from './Item.module.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faComment } from '@fortawesome/free-solid-svg-icons'
import AuthorInfo from '../../components/AuthorInfo/AuthorInfo';
import { InputButton } from '../Input/Input';

const Item = ({
   title, text, imageUrl, tags, commentsCount, createdAt, price, currency, _id, user, isFullItem
}) => {
   const userData = useSelector((state) => state.auth.data)

   const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
   });
   const priceText = formatter.format(price);
   const textFormat = isFullItem ? text : (text.length > 100 ?
      text.substring(0, 100 - 3) + "..." :
      text)

   const isEditable = (userData?._id === user._id)

   return isFullItem
      ?
      <div className={styles.itemContainer_full}>
         <div className={styles.image_full}><img src={`http://localhost:3001${imageUrl}`} alt="item" /></div>
         <div className={styles.itemWrapper_full}>
            <AuthorInfo user={user} createdAt={createdAt} isEditable={isEditable} path="items" id={_id} />
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
      <div className={styles.itemContainer}>
         <div className={styles.image}><img src={`http://localhost:3001${imageUrl}`} alt="item" /></div>
         <div className={styles.itemWrapper}>
            <div className={styles.title}>
               <h2><Link to={`/items/${_id}`}>{title}</Link></h2>
               {isEditable &&
                  <Link to={`/items/${_id}/edit`} className={styles.editLink}>
                     <FontAwesomeIcon icon={faPencil} />
                  </Link>}
            </div>
            <div className={styles.text}><p>{textFormat}</p></div>
            <div className={styles.price}>
               <p>{priceText} <span>{currency}</span></p></div>
         </div>
      </div >
}

export default Item


