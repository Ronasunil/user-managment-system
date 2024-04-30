import { useState } from "react"
import Button from "../../ui/Button"
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteUser, editUser } from "./userSlice";


export default function UserItem({user, query}) {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState('')
    const dispatch = useDispatch();

    const handleDelete = async function() {
        try{
            await axios({
                method:"DELETE",
                url:`http://localhost:3000/api/v1/users/${user._id}`
            })
            dispatch(deleteUser(user._id))
        }catch(err) {
            console.log(err);
        }
    }

    const handleUpdate = async function() {
        setEdit(false)
        try{
            const res =  await axios({
                  method:"PATCH",
                  url:`http://localhost:3000/api/v1/users/${user._id}`,
                  data: {name}
  
              })
              console.log(res);
              dispatch(editUser(user._id, {name}))
          }catch(err) {
              console.log(err);
          }
    }
    return (
        <div className="h-16 w-96 bg-blue-100 rounded flex items-center p-2 content-between ">
            <div className="flex gap-3">
                <img className="rounded " src={user.profileImg} width='10%'/>
                {edit ?<input className="w-40 px-3 rounded" onChange={(e) => setName(e.target.value)} type="text" defaultValue={user.name}/> :<span>{user.name}</span>}
                </div>
                <div className="flex gap-6 items-center">
                    <Button onClick={handleDelete} type="delete">Delete</Button>
                    {edit ?<Button onClick={handleUpdate} type="edit">Confirm</Button> :<Button onClick={() => setEdit(true)} type="edit">Edit</Button>}
            </div>   
        </div> 

    )
}