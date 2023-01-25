import React, { createContext, useContext, useReducer } from "react";
import { firestore } from "../config/firebaseConfig";

const actionTypes = {
  GET_USER_ORDERS: "GET_USER_ORDERS",
};

const initialState = {
  orders: [],
};

const OrderContext = createContext({
  orders: [],
  getOrders: () => {},
});

export const useOrder = () => useContext(OrderContext);

const orderReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const getOrders = (id) => {
    firestore
      .doc(`users/${id}`)
      .collection("orders")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        dispatch({
          type: actionTypes.GET_USER_ORDERS,
          payload: snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        });
      });
  };

  const value = {
    orders: state.orders,
    getOrders,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export default OrderProvider;
