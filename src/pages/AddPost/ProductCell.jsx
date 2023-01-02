import React from 'react';
import styles from './ProductCell.module.css';
import cls from 'classnames';
import { API_URL } from '../../api/api';

const ProductCell = ({
   title, id, imageUrl, toggleProductSelected, isSelected
}) => {
   const onClick = () => {
      toggleProductSelected(id, title);
   };

   return (
      <div className={cls({ [styles.selected]: isSelected }, styles.itemCellContainer)}>
         <div className={styles.itemCellWrapper}>
            <h4 className={styles.title}>{title}</h4>
            <div className={styles.image}>
               {imageUrl && <img src={`${API_URL}${imageUrl}`} alt="poster" />}
            </div>
         </div>
         <button onClick={onClick} className={styles.button}></button>
      </div>
   );
};

export default ProductCell;