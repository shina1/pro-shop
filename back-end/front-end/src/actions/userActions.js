import axios from 'axios'
import { USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETIALS_REQUEST,
    USER_DETIALS_SUCCESS,
    USER_DETIALS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
 }
     from "../constants/userConstants";

export const loginUser = (email, password)=> async(dispatch) => {
    try {

        // dispatch action for login request
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', {email, password}, config)

        // dispatch action for login in
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
        
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            // payload: error.response && error.data.message ? error.response.data.message : error.message,
            payload: error.response.data.message
        })
        // console.log(error);
        
    }
}

export const logoutAction = ()=> (dispatch) =>{
    localStorage.removeItem('userInfo')
     // dispatch action for login out
     dispatch({
        type: USER_LOGOUT
    })
}

export const registerAction = (name, email, password)=> async(dispatch) =>{

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users', {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message 
        })
    }
}

export const userProfileAction = (id) => async(dispatch, getState)=>{
    try {
        dispatch({
            type:USER_DETIALS_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/users/${id}`, config)
        console.log('from the get profile action',data)
        dispatch({
            type: USER_DETIALS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETIALS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUserProfileAction = (user) => async(dispatch, getState)=>{
    try {
        dispatch({
            type:USER_UPDATE_PROFILE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(`/api/users/profile`,user,config)
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}