import * as actionType from "../actionTypes";
import { updateObject } from "../utilityReducers";

const initialState = {
    cart: [],
    cartCount: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            return updateObject(state, action.payload);
        default:
            return state;
    }
};

export default reducer;