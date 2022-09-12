import React from 'react'
import styles from './ProductCell.module.css'
import cls from 'classnames'

const ProductCell = ({
   title, _id, imageUrl, toggleProductSelected, isSelected
}) => {
   const onClick = () => {
      toggleProductSelected(_id, title)
   }

   return (
      <div className={cls({ [styles.selected]: isSelected }, styles.itemCellContainer)}>
         <div className={styles.itemCellWrapper}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.image}>
               {imageUrl && <img src={`http://localhost:3001${imageUrl}`} alt="poster" />}
            </div>
         </div>
         <button onClick={onClick} className={styles.button}></button>
      </div>
   )
}

export default ProductCell