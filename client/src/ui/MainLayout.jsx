import { Outlet, useLocation, useNavigate, useNavigation} from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authentication/authenticationSlice";

export default function MainLayout() {
    const navigation = useNavigation();
    const isAuthenticated = useSelector(state => state.authentication.authenticated)
    const dispatch = useDispatch();
    const [user, setUser] = useState({})
    const {pathname} = useLocation();
    const [key, setKey] = useState(0)
    const navigate = useNavigate();

    const handleLogout = function() {
        dispatch(logout()) 
        localStorage.clear()
        navigate('/') 
        setKey(prevKey => prevKey + 1)
    }
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setUser(data?.user ?? {});

    },[])

    useEffect(() => {

        setKey(prevKey => prevKey + 1);
    }, [isAuthenticated]) 


        return<div className="flex flex-col h-screen w-full">
        <header className="bg-blue-500 flex  h-24 w-full items-center px-7 justify-between">
            <h1 className="font-obrivon text-3xl font-medium text-white tracking-[3px]">Dummy site</h1>
           {isAuthenticated ? <Button onClick={handleLogout} type="login">Logout</Button>  : <Button type="login" to={pathname === '/signup' ? '/login' : '/signup'}>{pathname === '/signup' ? 'Login' : 'signup'}</Button>}
        </header>
        <div className="h-full w-screen flex justify-center items-center">
            <Outlet/>
        </div>
        </div>
    

     
}