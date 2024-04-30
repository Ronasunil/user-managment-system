import { RouterProvider, createBrowserRouter } from "react-router-dom"
import MainLayout from "./ui/MainLayout"
import PageHeading from "./ui/PageHeading"
import Signup from "./ui/Signup"
import Login from "./ui/Login"
import Home from "./ui/Home"
import ProtectRoute from "./ui/ProtectRoute"
import Error from './ui/Error'

const router = createBrowserRouter([
  {

    element:<MainLayout/>,
    errorElement:<Error/>,
    children:[{
      path:"/",
      element:<PageHeading/>
    },

    {
      path: "signup",
      element:<Signup/>
    },

    {
      path:"login",
      element:<Login/>
    },

    {
      path:"/home",
      element: <ProtectRoute><Home/></ProtectRoute>
    }
  
  ]
  }
])

function App() {


  return <RouterProvider router={router}/>
}

export default App
