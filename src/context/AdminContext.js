import axios from "axios";
import React, { useReducer } from "react";
import { API } from "../helpers/consts";

//! Подключение хука CreateContex

export const adminContext = React.createContext();

//! Состояния

const initState = {
  products: [],
  productToEdit: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_TO_EDIT":
      return { ...state, productToEdit: action.payload };
    default:
      return state;
  }
};

const AdminContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const addProduct = async (newProduct) => {
    await axios.post(API, newProduct);
  };

  const getProducts = async () => {
    const response = await axios(API);
    const action = {
      type: "GET_PRODUCTS",
      payload: response.data,
    };
    dispatch(action);
  };

  const saveEditedProduct = async (editedProduct) => {
    await axios.patch(`${API}/${editedProduct.id}`, editedProduct);
  };
  const deleteProduct = async (id) => {
    await axios.delete(`${API}/${id}`);
    getProducts();
  };
  const getProductsToEdit = async (id) => {
    const response = await axios(`${API}/${id}`);
    // console.log(response.data);
    const action = {
      type: "GET_PRODUCT_TO_EDIT",
      payload: response.data,
    };
    dispatch(action);
  };

  return (
    <adminContext.Provider
      value={{
        addProduct: addProduct,
        getProducts: getProducts,
        getProductsToEdit: getProductsToEdit,
        saveEditedProduct: saveEditedProduct,
        deleteProduct: deleteProduct,
        products: state.products,
        productToEdit: state.productToEdit,
      }}
    >
      {props.children}
    </adminContext.Provider>
  );
};

export default AdminContext;
