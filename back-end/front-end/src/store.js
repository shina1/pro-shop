import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'
import {userLoginReducer, userRegisterReducer, userProfileReducer} from './reducers/userReducer'


// the combined reducers
const reducer = combineReducers({
    productList: productListReducer, 
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
})

// getting user info from the local storage

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

// getting the cart items form the local storage and then saving it in oiur initial state.
const cartItemsFromStorage = localStorage.getItem('shopCartItems') ? JSON.parse(localStorage.getItem('shopCartItems')) : []

// our initial state loaded with cartItems from the localstatorage
const initialState = {
    cart : {
        cartItems: cartItemsFromStorage,
    },
    userLogin:{
        userInfo : userInfoFromLocalStorage
    }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;