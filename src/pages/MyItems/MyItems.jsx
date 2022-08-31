import React from 'react'
import styles from './MyItems.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMineItems } from '../../redux/slices/itemsSlice';
import { selectIsAuth } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import Item from '../../components/Item/Item';

const MyItems = () => {
   const dispatch = useDispatch()
   const itemsData = useSelector((state) => state.items.myItems.items)
   const isAuth = useSelector(selectIsAuth)

   const items = itemsData.map((item) => <Item isFullItem={false} key={item._id} {...item} />)


   React.useEffect(() => {
      dispatch(fetchMineItems())
   }, [])

   if (!window.localStorage.getItem('token') && !isAuth) {
      return <Navigate to='/' />
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.addButton}><a href="/add-item">add</a></div>
            {[items]}
         </div>
      </div>
   )
}

export default MyItems