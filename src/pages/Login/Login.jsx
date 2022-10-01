import React from "react"
import styles from './Login.module.css'
import withHeaderHOC from "@components/Header/Header"

import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { fetchLogin, selectIsAuth } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { InputButton } from '@components/Input/Input';

const Login = () => {
   const isAuth = useSelector(selectIsAuth)
   const { t } = useTranslation()
   const dispatch = useDispatch()
   const { register, handleSubmit, formState: { errors, isValid, } } = useForm({
      defaultValues: {
         email: '',
         password: '',
      },
      mode: 'onChange'
   })

   const onSubmit = async (values) => {
      const data = await dispatch(fetchLogin(values))
      if (data.payload) {
         window.localStorage.setItem('token', data.payload.token)
      }
   }

   return (isAuth) ?
      <Navigate to="/" />
      :
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.title}><h2>{t("Login.login")}</h2></div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className={styles.input}>
                  <input {...register('email', { required: t("basics.enter_email") })} type="text" placeholder={t("placeholders.email")} />
                  {errors.email?.message ? <p>{errors.email?.message}</p> : ''}
               </div>
               <div className={styles.input}>
                  <input  {...register('password', { required: t("basics.enter_password") })} type="password" placeholder={t("placeholders.password")} />
                  {errors.password?.message ? <p>{errors.password?.message}</p> : ''}
               </div>
               <InputButton className={styles.sendButton} disabled={!isValid} type="submit" value={t("Login.login_button")} />
            </form>
         </div>
      </div>
}

export default withHeaderHOC(Login, "log in")