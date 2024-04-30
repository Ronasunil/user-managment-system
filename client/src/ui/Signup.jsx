import {useForm} from 'react-hook-form'
import *  as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import { Loader } from 'rsuite';
import { useDispatch } from 'react-redux';
import 'rsuite/Loader/styles/index.css';

import Button from "./Button"
import Input from "./Input"
import { login } from '../features/authentication/authenticationSlice';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const defaultValues = {
  name:"",
  username:"",
  password:"",
  confirmPassword:""
}

// validation schema
const validationSchema = yup.object({
  name: yup.string().required("name is missing").min(3, "name atleast nedd 3 character"),
  username: yup.string().required("username is missing"),
  password: yup.string().required("password is missing")
  .matches(/^.{8,}$/, "password atleast need 8 characters")
  .matches(/(?=.*[A-Z])/, "password must have one uppercase character")
  .matches(/[a-z]/, 'password must have one lowercase character')
  .matches(/[\W_]/, 'password must have one special character')
  .matches(/(?=.*\d)/, "password must need 1 number"),
  confirmPassword: yup.string().required("confirm password is missing").oneOf([yup.ref('password')], 'confirm password must be same as password')
}).required()

export default function Signup() {
  const {register, handleSubmit, formState:{errors, isSubmitting}, setError} = useForm({defaultValues, resolver:yupResolver(validationSchema)})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
   const data = JSON.parse(localStorage.getItem('user'));
   if(data) navigate('/home')
  },[navigate])

  const onSubmit = async function(data) {

    try{
      const res = await axios({
        method: "POST",
        url:"http://localhost:3000/api/v1/users/signup",
        data
      })

    const user = res.data.data
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(login(user.user, user.token))
      navigate('/home')
    }catch(err){
      console.log(err)
      const {path, errorMessage} = err.response.data;
      setError(path, {type:"server", message: errorMessage})
    }

  }



  return <div className="px-20 bg-blue-50 rounded py-6 ">
    <h2 className="text-blue-500 uppercase text-center font-medium font-obrivon text-3xl mb-5">create your account</h2>
    <form className=" flex flex-col items-center gap-7" onSubmit={handleSubmit(onSubmit)}> 
    <Input error={errors} name="name" register={register} label="name" placeholder="name"/>
    <Input error={errors} name="username" register={register} label="username" placeholder="username"/>
    <Input error={errors} name="password" register={register} label="password" placeholder="password"/>
    
    <Input error={errors} name="confirmPassword" register={register} label="confirm password" placeholder="password"/>
    <div className="">
    <Button  type="primary">{isSubmitting ?<div className='flex gap-2 justify-center items-center'><span>singup</span> <Loader size='sm'/> </div>:'signup'}</Button>
    </div>

  </form>
  </div>
}

  