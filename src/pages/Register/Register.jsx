import React from "react"
import styles from './Register.module.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom'
import { InputButton } from "../../components/Input/Input";

const Register = () => {
   const isAuth = useSelector(selectIsAuth)

   const dispatch = useDispatch()
   const { register, handleSubmit, formState: { errors, isValid, } } = useForm({
      defaultValues: {
         fullName: '',
         email: '',
         password: '',
      },
      mode: 'onChange'
   })

   const onSubmit = async (values) => {
      const data = await dispatch(fetchRegister(values))
      if (data.payload) {
         window.localStorage.setItem('token', data.payload.token)
      }
   }

   return (isAuth) ?
      <Navigate to="/" />
      :


      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.title}><h2>Register</h2></div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className={styles.input}>
                  <input  {...register('fullName', { required: 'Enter the fullname' })} type="text" placeholder="username" />
                  {errors.email?.message ? <p>{errors.fullName?.message}</p> : ''}
               </div>
               <div className={styles.input}>
                  <input {...register('email', { required: 'Enter the email' })} type="text" placeholder="email" />
                  {errors.email?.message ? <p>{errors.email?.message}</p> : ''}
               </div>
               <div className={styles.input}>
                  <input  {...register('password', { required: 'Enter the password' })} type="password" placeholder="password" />
                  {errors.password?.message ? <p>{errors.password?.message}</p> : ''}
               </div>
               <InputButton className={styles.sendButton} disabled={!isValid} type="submit" value="sign up" />
            </form>
         </div>
      </div>
}

export default Register




