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


export const userLoginReducer= (state ={}, action)=>{
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return{loading: true}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return{loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}   
        default:
            return state;
    }
} 

export const userRegisterReducer = (state= {}, action)=>{
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const userProfileReducer = (state={ user: {} }, action)=> {
    switch (action.type) {
        case USER_DETIALS_REQUEST:
            return {...state, loading: true}
        case USER_DETIALS_SUCCESS:
            return{loading: false, user:action.payload}
        case USER_DETIALS_FAIL:
            return {loading: false, error:action.payload}
        default:
            return state;
    }
}

export const userProfileUpdateReducer = (state={ }, action)=> {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {...state, loading: true}
        case USER_UPDATE_PROFILE_SUCCESS:
            return{loading: false, success:true,  userInfo:action.payload}
        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error:action.payload}
        default:
            return state;
    }
}
