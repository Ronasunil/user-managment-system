import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import UserItem from "../features/users/UserItem";
import Button from "./Button";

import {setUsers} from '../features/users/userSlice'

export default function Home () {
    const [user, setUser] = useState({})
    const [isSorted, setIsSorted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch = useDispatch();
    let users = useSelector(state => state.user.users)
    let queryUsers = !searchQuery ?  users : users.filter(user => user.name.startsWith(searchQuery))

    useEffect( () => {
      const data = JSON.parse(localStorage.getItem('user'));
      setUser(data.user)

    },[])

    useEffect(() => {
        if(user?.role === 'user') return;
      const fetchUsers = async function() {
        const res =  await axios({
            url:"http://localhost:3000/api/v1/users/",
            method:"GET",
          })
        
          dispatch(setUsers(res.data.data));
      }

      fetchUsers()
    },[dispatch, user.role])

    const handleSort = function() {
      setIsSorted(state => !state)
      console.log(isSorted)
      users = [...queryUsers].sort((a,b) => (isSorted ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))

      dispatch(setUsers(users));
    }
    


    if(user.role === 'admin') {
        return <div className="flex flex-col gap-5 items-center">
                    <span className="uppercase text-lg font-semibold">users</span>
                    <Button onClick={handleSort} type="primary">sort</Button>
                    <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="search" className=" h-9 outline-none ring-1 ring-blue-100 rounded px-2"/>
                        {queryUsers.map(user => <UserItem  user={user} key={user._id}/>)}
                </div>
    }

    return <div>
             <input type="file" id="fileInput" style={{display:"none"}}/>
             <label htmlFor="fileInput">
                <img className="rounded-full" height="100px" width="100%"  src={user.profileImg}/>
             </label>
          </div>
}