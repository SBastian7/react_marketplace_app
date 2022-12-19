import { configureStore } from '@reduxjs/toolkit'
import { userRegisterReducer, userLoginReducer } from '../redux/users/userReducer'

import Cookie from 'js-cookie';
import { productListReducer, categoryListReducer } from '../redux/products/productReducer';

const cartItems = Cookie.get('cartItems') || [];
const userInfo = Cookie.get('userInfo') || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};
const store = configureStore({
  reducer: {
    registerReducer: userRegisterReducer,
    userReducer: userLoginReducer,
    productReducer: productListReducer,
    categoryReducer: categoryListReducer,
  },
  initialState: initialState,
})

export default store;
