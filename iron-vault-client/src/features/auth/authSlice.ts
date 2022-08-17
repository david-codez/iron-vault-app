import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { GymMember } from '../../lib/User'
import authService from './authService'

// get user from local storage
  
// get user from local storage
// let user = JSON.parse(localStorage.user)
// console.log(localStorage.user)





//declaring initial state
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register the user
export const register = createAsyncThunk('auth/register', async (user: GymMember, thunkAPI) => {
    try {
        //makes call to authService register function which will handle http request
        return await authService.register(user)
    } catch (error: any) {
        //if an error is returned, search in several places for the error message and return it
        const message = (error.response && error.response.data && error.response.data.message) || 
            error.message || error.toString()
        
        // returns error message as payload
        return thunkAPI.rejectWithValue(message)    
    }
})

// login the user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        //makes call to authService login function which will handle http request and return user info
        return await authService.login(user)
    } catch (error: any) {
        //if an error is returned, search in several places for the error message and return it
        const message = (error.response && error.response.data && error.response.data.message) || 
            error.message || error.toString()
        
        // returns error message as payload
        return thunkAPI.rejectWithValue(message)    
    }
})

//logout user and destroy token in local storage
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

//creates authslice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            // register 
            .addCase(register.pending, (state) => { 
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state,action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            }) 
            // login 
            .addCase(login.pending, (state) => { 
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action: any) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state,action: any) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            // logout
            .addCase(logout.fulfilled, (state) =>{
                state.user = null
            })
    },

})

export const {reset} = authSlice.actions
export default authSlice.reducer