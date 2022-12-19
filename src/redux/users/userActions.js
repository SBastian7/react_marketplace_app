import Axios from "axios";
import Cookie from 'js-cookie';
import jwt from 'jwt-decode'

import {
//   USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
//   USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, 
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT
} from "../users/userConstants";

// const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
//   const { userSignin: { userInfo } } = getState();
//   dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
//   try {
//     const { data } = await Axios.put("/api/users/" + userId,
//       { name, email, password }, {
//       headers: {
//         Authorization: 'Bearer ' + userInfo.token
//       }
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//     Cookie.set('userInfo', JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
//   }
// }

const login = (username, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { username, password } });
  try {
    const { data } = await Axios.post(process.env.REACT_APP_API_URL+"api/token/", { username, password });
    const user = jwt(data.access);
    const userId = user.user_id;
    const config = {
      headers:{
        Authorization: 'Bearer '+data.access,
      }
    };
    const { data: userData } = await Axios.get(process.env.REACT_APP_API_URL+"api/users/"+userId, config);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: userData });
    Cookie.set('accessToken', JSON.stringify(data.access));
    Cookie.set('refreshToken', JSON.stringify(data.refresh));
    Cookie.set('userInfo', JSON.stringify(userData));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
}

const register = (username, first_name, last_name, email, password, password2) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { username, first_name, last_name, email, password, password2 } });
  try {
    const { data } = await Axios.post(process.env.REACT_APP_API_URL+"auth/register/", { username, first_name, last_name, email, password, password2 });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data)
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  Cookie.remove("accessToken");
  Cookie.remove("refreshToken");
  dispatch({ type: USER_LOGOUT })
}
export { register, login, logout };