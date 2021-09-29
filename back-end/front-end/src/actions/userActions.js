import axios from 'axios'
import { USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_DETIALS_REQUEST,
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
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/users', {name, email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
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

export const userProfileAction = () => async(dispatch)=>{
    try {
        dispatch({
            type:USER_DETIALS_REQUEST
        })
    } catch (error) {
        
    }
}