import React from "react"
import styles from "./FullItem.module.css"
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { fetchOneItem, fetchRemoveItem } from "../../redux/slices/itemsSlice";
import Item from "../../components/Item/Item";


const FullItem = () => {
   const dispatch = useDispatch()
   const { id } = useParams()
   const itemData = useSelector((state) => state.items.currentItem.item)
   const isLoaded = useSelector(state => state.items.currentItem.status === 'loaded')

   const onRemove = (id) => {
      dispatch(fetchRemoveItem(id))
   }

   React.useEffect(() => {
      dispatch(fetchOneItem(id))
   }, [id])

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            {isLoaded ? <Item {...itemData} isFullItem={true} /> : <div>Loading</div>}
            <div className={styles.deleteButton}><button onClick={() => onRemove(id)}>delete item</button></div>
         </div>
      </div>
   )
}

export default FullItem