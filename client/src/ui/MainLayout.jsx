import { Outlet, useLocation} from "react-router-dom";
import Button from "./Button";

export default function MainLayout() {
    const {pathname} = useLocation();


    return<div className="flex flex-col h-screen w-full">
        <header className="bg-blue-500 flex  h-24 w-full items-center px-7 justify-between">
            <h1 className="font-obrivon text-3xl font-medium text-white tracking-[3px]">Dummy site</h1>
            <Button type="login" to={pathname === '/signup' ? '/login' : '/signup'}>{pathname === '/signup' ? 'Login' : 'signup'}</Button>
        </header>
        <div className="h-full w-screen flex justify-center items-center">
            <Outlet/>
        </div>
        </div>
     
}