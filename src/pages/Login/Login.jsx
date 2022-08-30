import React from "react"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, selectIsAuth } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom'

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
      <div>
         <h2>Log in</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email"></label>
            <input {...register('email', { required: 'Enter the email' })} id="email" type="text" />
            {errors.email?.message ? <p>{errors.email?.message}</p> : ''}
            <br />
            <label htmlFor="password"></label>
            <input {...register('password', { required: 'Enter the password' })} id="password" type="password" />
            {errors.password?.message ? <p>{errors.password?.message}</p> : ''}
            <br />
            <input disabled={!isValid} type="submit" value="log in" />
         </form>
      </div>
}

export default Login