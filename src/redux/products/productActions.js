import { sendRequest } from "../../connections/implementations";
import { 
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS
} from './productTypes'


const listProducts = (
    page = 1,
    category = '',
    searchKeyword = '',
    sortOrder = '',
) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const params = {
            page: page,
            keyword: searchKeyword,
            order: sortOrder,
            category: category,
        }
        const { data } = await sendRequest('api/products/', {}, 'GET', params)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });
        const { data } = await sendRequest('api/categories/', {}, 'GET')
        dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message })
    }
}

export { listProducts, listCategories }