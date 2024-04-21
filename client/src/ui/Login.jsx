import Button from "./Button";
import Input from "./Input";


export default function Login() {
    return <div className="px-20 bg-blue-50 rounded py-6">
    <h2 className="text-blue-500 uppercase text-center font-medium font-obrivon text-3xl mb-5 tracking-wide">Log into your account</h2>
    <form
    className=" flex flex-col items-center gap-7"> 

    <Input label="Username" placeholder="username"/>
    <Input label="Password" placeholder="password"/>
    <Button type="primary">login</Button>

  </form>
  </div>
}