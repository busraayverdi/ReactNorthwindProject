import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      var addedItem = state.find(
        (c) => c.product.id === action.payload.product.id
      );
      if (addedItem) {
        var newState = state.map((cartItem) => {
          if (cartItem.product.id === action.payload.product.id) {
            return Object.assign({}, addedItem, {
              quntity: addedItem.quntity + 1,
            });
          }
          return cartItem;
        });
        return newState;
      } else {
        return [...state, { ...action.payload }];
        //...state-->stateın bir kopyasını al demek.
        //bu kopyaya action ile gelen payload ı ekle.
        //arraye eleman ekleriz ama kopyasını alıp.Redux da push pop olayı yok.Yani bunu bu yöntemlerle yapamayız.
      }
    case actionTypes.REMOVE_FROM_CART:
      const newState2 = state.filter(
        (cartItem) => cartItem.product.id !== action.payload.id

      );
      return newState2;

    default:
      return state;
  }
}
