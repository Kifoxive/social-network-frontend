import React from "react";
import styles from './Register.module.css';

import Header from "@components/Header/Header";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchAuthMe, fetchRegister, selectIsAuth } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { InputButton } from "@components/Input/Input";

const Register = () => {
   const isAuth = useSelector(selectIsAuth);
   const { t } = useTranslation();
   const dispatch = useDispatch();
   const { register, handleSubmit, formState: { errors, isValid, } } = useForm({
      defaultValues: {
         fullName: '',
         email: '',
         password: '',
      },
      mode: 'onChange'
   });

   const onSubmit = async (values) => {
      dispatch(fetchRegister(values));
   };

   return ((isAuth) ?
      <Navigate to="/" />
      :
      <>
         <Header locationName={t("pages.Register")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               <div className={styles.title}><h2>{t("Register.register")}</h2></div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles.input}>
                     <input  {...register('fullName', { required: t("basics.enter_username") })} type="text" placeholder={t("placeholders.username")} />
                     {errors.email?.message ? <p>{errors.fullName?.message}</p> : ''}
                  </div>
                  <div className={styles.input}>
                     <input {...register('email', { required: t("basics.enter_email") })} type="text" placeholder={t("placeholders.email")} />
                     {errors.email?.message ? <p>{errors.email?.message}</p> : ''}
                  </div>
                  <div className={styles.input}>
                     <input  {...register('password', { required: t("basics.enter_password") })} type="password" placeholder={t("placeholders.password")} />
                     {errors.password?.message ? <p>{errors.password?.message}</p> : ''}
                  </div>
                  <InputButton className={styles.sendButton} disabled={!isValid} type="submit" value={t("Register.register_button")} />
               </form>
            </div>
         </div>
      </>);
};

export default Register;




