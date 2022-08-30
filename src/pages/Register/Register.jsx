import React from "react"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom'

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
      <div>
         <h2>Register</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="fullName"></label>
            <input  {...register('fullName', { required: 'Enter the fullname' })} id="fullName" type="text" />
            <br />
            <label htmlFor="email"></label>
            <input {...register('email', { required: 'Enter the email' })} id="email" type="text" />
            {errors.email?.message ? <p>{errors.email?.message}</p> : ''}
            <br />
            <label htmlFor="password"></label>
            <input {...register('password', { required: 'Enter the password' })} id="password" type="password" />
            {errors.password?.message ? <p>{errors.password?.message}</p> : ''}
            <br />
            <input disabled={!isValid} type="submit" value="Sign up" />
         </form>
      </div>
}

export default Register