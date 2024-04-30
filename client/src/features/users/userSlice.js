import { createSlice } from "@reduxjs/toolkit";

const initialState = {users:[]}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{

        setUsers(state, action) {
            state.users = action.payload
        },

        editUser:{

            prepare(id, updatedInfo) {
                return{
                    payload:{id, updatedInfo}
                }
            },
            reducer(state, action) {
                const userIndex = state.users.findIndex(user => user._id === action.payload.id)
                state.users[userIndex] = {...state.users[userIndex], ...action.payload.updatedInfo}
            }
        },
        
        deleteUser(state, action) {
            state.users = state.users.filter(user => user._id !== action.payload)
        }
    }
})


export const {editUser, deleteUser, setUsers} = userSlice.actions

export default userSlice.reducer;