import React from 'react';

import { logout, selectIsAuth } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '@components/Navbar/Navbar';

const Header = ({ locationName }) => {
   const dispatch = useDispatch();
   const isAuth = useSelector(selectIsAuth);
   const userData = useSelector((state) => state.auth.data) || '';

   const onClickLogout = () => {
      dispatch(logout());
   };

   return <Navbar isAuth={isAuth} onClickLogout={onClickLogout} userData={userData} locationName={locationName} />;
};

export default Header;

