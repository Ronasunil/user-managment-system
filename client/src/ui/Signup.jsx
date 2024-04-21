import Button from "./Button"
import Input from "./Input"

export default function Signup() {
  return <div className="px-20 bg-blue-50 rounded py-6">
    <h2 className="text-blue-500 uppercase text-center font-medium font-obrivon text-3xl mb-5">create your account</h2>
    <form
    className=" flex flex-col items-center gap-7"> 
    <Input label="Name" placeholder="name"/>
    <Input label="Username" placeholder="username"/>
    <Input label="Password" placeholder="password"/>
    <Input label="Confirm password" placeholder="password"/>
    <div className="">
    <Button type="primary">signup</Button>
    </div>

  </form>
  </div>
}

  