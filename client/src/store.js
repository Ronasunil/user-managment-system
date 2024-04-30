import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authentication/authenticationSlice";
import {login} from './features/authentication/authenticationSlice'
import userReducer from './features/users/userSlice'


const store = configureStore({
   reducer:{
    authentication: authenticationReducer,
    user: userReducer
   }
})

const checkLocalStorage = function() {
  const data = JSON.parse(localStorage.getItem('user'));
  return data || null;
}

const data = checkLocalStorage()

if(data) {
   store.dispatch(login(data.user, data.token))
}


export default store;