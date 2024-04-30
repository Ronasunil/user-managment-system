import * as yup from 'yup'
import { useForm } from 'react-hook-form';

import Button from "./Button";
import Input from "./Input";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Loader } from 'rsuite';
import LoginError from '../features/LoginError';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';



const validationSchema = yup.object({
  username: yup.string().required("username is missing"),
  password: yup.string().required("password is missing").min(8, 'password atleast need 8 characters')

}).required()

const defaultValues = {
  username:'',
  password:''
}


export default function Login() {
  const {register, formState:{errors, isSubmitting}, setError,  handleSubmit} = useForm({defaultValues, resolver: yupResolver(validationSchema)})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    if(data) navigate('/home')
   })

  const onSubmit = async function(data) {
    try{
     const res =  await axios({
        method:"POST",
        url: 'http://localhost:3000/api/v1/users/login',
        data,
      })
      const user = res.data.data
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(login(user.user, user.token))
        navigate('/home')
    }catch(err) {
      const {path, errorMessage} = err.response.data
      setError(path, {type: "server", message:errorMessage});
    }
  }

    console.log(errors, 'lk')
    return <div className="px-20 bg-blue-50 rounded py-6">
    <h2 className="text-blue-500 uppercase text-center font-medium font-obrivon text-3xl mb-5 tracking-wide">Log into your account</h2>
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col items-center gap-7"> 
    <Input register={register} error={errors} label="username" name="username" placeholder="username"/>
    <Input register={register} error={errors}label="password" name="password" placeholder="password"/>
    {errors?.login && <LoginError message={errors.login.message}/>}
    <Button type="primary">{isSubmitting ? <div className='flex items-center gap-2'><span>loginn</span><Loader size='sm'/></div> : 'login'}</Button>

  </form>
  </div>
}