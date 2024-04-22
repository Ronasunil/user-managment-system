import {useForm} from 'react-hook-form'
import *  as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "./Button"
import Input from "./Input"

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
  const {register, handleSubmit, formState:{errors}} = useForm({defaultValues, resolver:yupResolver(validationSchema)})

  const onSubmit = function(data) {
    
  }



  return <div className="px-20 bg-blue-50 rounded py-6 ">
    <h2 className="text-blue-500 uppercase text-center font-medium font-obrivon text-3xl mb-5">create your account</h2>
    <form className=" flex flex-col items-center gap-7" onSubmit={handleSubmit(onSubmit)}> 
    <Input error={errors} name="name" register={register} label="name" placeholder="name"/>
    <Input error={errors} name="username" register={register} label="username" placeholder="username"/>
    <Input error={errors} name="password" register={register} label="password" placeholder="password"/>
    <Input error={errors} name="confirmPassword" register={register} label="confirm password" placeholder="password"/>
    <div className="">
    <Button type="primary">signup</Button>
    </div>

  </form>
  </div>
}

  