import React from 'react'
import styles from './MyItems.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMineItems } from '../../redux/slices/itemsSlice';
import Item from '../../Components/Item/Item';

const MyItems = () => {
   const dispatch = useDispatch()
   const itemsData = useSelector((state) => state.items.myItems.items)

   const items = itemsData.map((item) => <Item key={item._id} {...item} />)

   React.useEffect(() => {
      dispatch(fetchMineItems())
   }, [])

   return (

      <div className={styles.container}>
         <div className={styles.wrapper}>
            {[items]}
         </div>
      </div>
   )
}

export default MyItems