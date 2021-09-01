import * as actionType from "../actionTypes";
import {getOffer} from '../../data';

const callActionAddToCart = (payload) => {
    return {
      type: actionType.ADD_TO_CART,
      payload: payload,
    };
};

export const addToCart = (payload) => {
    return (dispatch, getState) => {
        var myCart = getState().appReducer.cart;
        myCart.push({...payload, qty: 1});
        myCart.forEach((item, index) => {
          let saving = getOffer(item);
          myCart[index].saving = saving;
          myCart[index].cost = parseFloat((item.price * item.qty) - saving).toFixed(2) ;
        })
        var count = myCart.length;
        let data = {
          cart : myCart,
          cartCount: count
        }
        dispatch(callActionAddToCart(data))
  }
}

export const updateQty = (payload) => {
  return (dispatch, getState) => {
      let myCart = getState().appReducer.cart;
      let index = myCart.findIndex((item) => item.id === payload.id);
      if(payload.qty > 0){
        myCart[index].qty = payload.qty;
      }
      else{
        myCart = myCart.filter((item) => item.id !== payload.id)
      }
      myCart.forEach((item, index) => {
        let saving = getOffer(item);
        myCart[index].saving = saving;
        myCart[index].cost = parseFloat((item.price * item.qty) - saving).toFixed(2) ;
      })
      let count = myCart.length;
      let data = {
        cart : myCart,
        cartCount: count
      }
      dispatch(callActionAddToCart(data))
}
}
