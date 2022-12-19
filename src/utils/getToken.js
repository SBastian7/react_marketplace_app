import Axios from 'axios'

export const getToken = async (email, password) => {
    const { data } = await Axios.post(process.env.REACT_APP_API_URL+"api/token/", { username, password });
    return data.access;
}