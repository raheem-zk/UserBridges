import { createSlice } from "@reduxjs/toolkit";

const INITTAL_STATE = {
    users: {},
}
const userSlice = createSlice({
    name:'usersData',
    initialState: INITTAL_STATE,
    reducers:{
        setUsersData: (state, action)=>{
            state.users = action.payload;
        },
        clearUserData:(state, action)=>{
            state.users = {}
        }
    }
})


export const { setUsersData , clearUserData} = userSlice.actions;
export default userSlice.reducer;
