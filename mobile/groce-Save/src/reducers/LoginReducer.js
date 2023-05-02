import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:"login",
    initialState:{
        login:[],
    },
    reducers:{
        login : (state, action) => {
            const itemInLogin = state.login;
            if(itemInLogin){
                state.login.push({...action.payload})
            }
        },
        updateLogin : (state, action) => {
            const itemInLogin = action.payload;
            if(itemInLogin){
                state.login = itemInLogin;
            }
        },
        logout : (state,action) => {
            const removeFromLogin = [];
            state.login = removeFromLogin;
        }
    }
});


export const {login,logout, updateLogin} = loginSlice.actions;

export default loginSlice.reducer;