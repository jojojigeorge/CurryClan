import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
  console.log('state',state)
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          quantity: 1,
          price: action.price,
        },
      ];

    case "REMOVE":
      let newCart = [...state];
      newCart.splice(action.index, 1);
      return newCart;

    case "UPDATE":
      console.log("update");
      let newArr = [...state];
      newArr.find((food, index) => {
        if (food.id === action.id) {
          // console.log('quantity',action.name)
          newArr[index] = {
            ...food,
            quantity: food.quantity + 1,
            price: parseInt(action.price) + parseInt(food.price),
          };
        }
      });
      return newArr;
    case "DROP":
      let emptyArr = [];
      return emptyArr;
    default:
      console.log("error in Reducer");
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
