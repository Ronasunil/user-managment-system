import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {user:null, token: null, authenticated:false, status:''}


export const validateToken = createAsyncThunk('authentication/validateToken', async function() {
    // check if user exist in local storage
    const data = JSON.parse(localStorage.getItem('user'));


    if(!data) throw new Error('user not found');

    // check it has token
    if(!data.token) throw new Error(`couldn't find token`)

    // validate token
    try{
         await axios({
            method: "POST",
            url: 'http://localhost:3000/api/v1/users/validate-token',
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          });

    }catch(err){
        console.log(err)
        throw new Error('invalid token')
    }

})

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,

    reducers:{
        login:{
            prepare(user, token) {
                return {
                    payload:{user, token}
                }
            },

            reducer(state, action) {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.authenticated = true;
            }

        },

        checkToken(state) {
            state.authenticated = true
        },

        logout(state) {
            state.name = null
        }
    },

    extraReducers:(builder) => {
        builder.addCase(validateToken.pending, (state, action) =>{
            state.status = 'loading'
        })
        .addCase(validateToken.fulfilled, (state, action) => {
            state.status = 'idle'
            state.authenticated = true
        })
        .addCase(validateToken.rejected, (state, action) => {
            state.authenticated = false;
            state.status = 'failed'
        })
    }
})


export const {login, logout,checkToken} = authenticationSlice.actions;



export default authenticationSlice.reducer;