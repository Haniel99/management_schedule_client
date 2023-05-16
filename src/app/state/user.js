import { createSlice } from "@reduxjs/toolkit";

export const initState = {
    token: '',
}
export const userInfo = createSlice({
    name: 'user',
    initialState:localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):initState,   
    reducers: {
        createUser: (state, action) => {
            localStorage.setItem('user', JSON.stringify({...action.payload}));
        }, 
        resetUser: () => {
            localStorage.removeItem('user');
        }
    }

})

export const {createUser, resetUser} = userInfo.actions;
export default userInfo.reducer; 