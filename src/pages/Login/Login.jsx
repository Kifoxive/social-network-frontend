import React from "react"
import styles from './Login.module.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, selectIsAuth } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom'
import { InputButton } from '../../components/Input/Input';

const Login = () => {
   const isAuth = useSelector(selectIsAuth)

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
            <div className={styles.title}><h2>Log in</h2></div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className={styles.input}>
                  <input {...register('email', { required: 'Enter the email' })} type="text" placeholder="email" />
                  {errors.email?.message ? <p>{errors.email?.message}</p> : ''}
               </div>
               <div className={styles.input}>
                  <input  {...register('password', { required: 'Enter the password' })} type="password" placeholder="password" />
                  {errors.password?.message ? <p>{errors.password?.message}</p> : ''}
               </div>
               <InputButton className={styles.sendButton} disabled={!isValid} type="submit" value="log in" />
            </form>
         </div>
      </div>
}

export default Login