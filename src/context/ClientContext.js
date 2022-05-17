import { cardActionAreaClasses } from "@mui/material";
import axios from "axios";
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
import React, { useEffect, useReducer, useState } from "react";
// import { auth } from "../firebase";

import { API } from "../helpers/consts";

export const clientContext = React.createContext();

const initState = {
  products: [],
  cartCount: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  myCart: null,
  productDetails: null,
  user: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT_TO_CART":
      return { ...state, cartCount: action.payload };
    case "DELETE_PRODUCT_IN_CART":
      return { ...state, cartCount: action.payload };
    case "GET_PROD_FROM_CART":
      return { ...state, myCart: action.payload };

    case "ADD_PRODUCT_TO_FAVORITE":
      return { ...state, FavoriteCount: action.payload };
    case "DELETE_PRODUCT_IN_FAVORITE":
      return { ...state, FavoriteCount: action.payload };
    case "GET_PROD_FROM_FAVORITE":
      return { ...state, myFavorite: action.payload };

    case "GET_PRODUCT_DETAILS":
      return { ...state, productDetails: action.payload };
    case "CHECK_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const ClientContext = (props) => {
  // console.log(window.location);
  const [state, dispatch] = useReducer(reducer, initState);
  const getProducts = async () => {
    const response = await axios(`${API}${window.location.search}`);
    const action = {
      type: "GET_PRODUCTS",
      payload: response.data,
    };
    dispatch(action);
  };

  const productsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = 0;

  const products = state.products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalCount = state.products.length;

  const handlePagination = (page) => {
    // setCurrentPage(page);
    setCurrentPage(currentPage + 1);
  };

  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    const newProduct = {
      product: product,
      count: 1,
      subPrice: 0,
    };
    newProduct.subPrice = product.price * newProduct.count;
    cart.products.push(newProduct);
    cart.totalPrice = cart.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);

    localStorage.setItem("cart", JSON.stringify(cart));

    const action = {
      type: "ADD_PRODUCT_TO_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      return false;
    }
    let prod = cart.products.find((item) => {
      return item.product.id === id;
    });
    if (prod) {
      return true;
    } else {
      return false;
    }
  };

  const deleteProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let newProducts = cart.products.filter((item) => {
      return item.product.id !== id;
    });
    cart.products = newProducts;
    cart.totalPrice = cart.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    const action = {
      type: "DELETE_PRODUCT_IN_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  };

  const getProdFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || { products: [] };
    const action = {
      type: "GET_PROD_FROM_CART",
      payload: cart,
    };
    dispatch(action);
  };

  const changeCountProductInCart = (id, count) => {
    if (count < 1) {
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = item.count * item.product.price;
      }
      return item;
    });
    cart.totalPrice = cart.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    getProdFromCart();
  };

  const likeCounter = async (id, count) => {
    await axios.patch(`${API}/${id}`, { likes: count + 1 });
    getProducts();
  };

  const getProductDetails = async (id) => {
    const response = await axios(`${API}/${id}`);
    const action = {
      type: "GET_PRODUCT_DETAILS",
      payload: response.data,
    };
    dispatch(action);
  };

  const addProductToFavorite = (product) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      favorite = {
        products: [],
        totalPrice: 0,
      };
    }
    const newProduct = {
      product: product,
      count: 1,
      subPrice: 0,
    };
    newProduct.subPrice = product.price * newProduct.count;
    favorite.products.push(newProduct);
    favorite.totalPrice = favorite.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);

    localStorage.setItem("favorite", JSON.stringify(favorite));

    const action = {
      type: "ADD_PRODUCT_TO_FAVORITE",
      payload: favorite.products.length,
    };
    dispatch(action);
  };

  const checkProductInFavorite = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    if (!favorite) {
      return false;
    }
    let prod = favorite.products.find((item) => {
      return item.product.id === id;
    });
    if (prod) {
      return true;
    } else {
      return false;
    }
  };

  const deleteProductInFavorite = (id) => {
    let favorite = JSON.parse(localStorage.getItem("favorite"));
    let newProducts = favorite.products.filter((item) => {
      return item.product.id !== id;
    });
    favorite.products = newProducts;
    favorite.totalPrice = favorite.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);
    localStorage.setItem("favorite", JSON.stringify(favorite));
    const action = {
      type: "DELETE_PRODUCT_IN_FAVORITE",
      payload: favorite.products.length,
    };
    dispatch(action);
  };

  const getProdFromFavorite = () => {
    const favorite = JSON.parse(localStorage.getItem("favorite")) || {
      products: [],
    };
    const action = {
      type: "GET_PROD_FROM_FAVORITE",
      payload: favorite,
    };
    dispatch(action);
  };

  const changeCountProductInFavorite = (id, count) => {
    if (count < 1) {
      return;
    }
    const favorite = JSON.parse(localStorage.getItem("favorite"));
    favorite.products = favorite.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = item.count * item.product.price;
      }
      return item;
    });
    favorite.totalPrice = favorite.products.reduce((prev, next) => {
      return prev + next.subPrice;
    }, 0);
    localStorage.setItem("favorite", JSON.stringify(favorite));
    getProdFromFavorite();
  };

  //   const authWithGoogle = async () => {
  //     const provider = new GoogleAuthProvider();
  //     signInWithPopup(auth, provider);
  //   };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     const action = {
  //       type: "CHECK_USER",
  //       payload: user,
  //     };
  //     dispatch(action);
  //   });
  // }, []);

  //   const logOut = () => {
  //     signOut(auth);
  //   };

  const addFeedback = async (newFeedback, product) => {
    if (product.feedBacks) {
      product.feedBacks.push(newFeedback);
      await axios.patch(`${API}/${product.id}`, product);
    } else {
      product.feedBacks = [newFeedback];
      await axios.patch(`${API}/${product.id}`, product);
    }
  };

  return (
    <clientContext.Provider
      value={{
        getProducts: getProducts,
        handlePagination: handlePagination,
        addProductToCart: addProductToCart,
        checkProductInCart: checkProductInCart,
        deleteProductInCart: deleteProductInCart,
        getProdFromCart: getProdFromCart,
        changeCountProductInCart: changeCountProductInCart,
        addProductToFavorite: addProductToFavorite,
        checkProductInFavorite: checkProductInFavorite,
        deleteProductInFavorite: deleteProductInFavorite,
        getProdFromFavorite: getProdFromFavorite,
        changeCountProductInFavorite: changeCountProductInFavorite,

        likeCounter: likeCounter,
        getProductDetails: getProductDetails,
        // authWithGoogle: authWithGoogle,
        // logOut: logOut,
        addFeedback: addFeedback,
        products: products,
        totalCount: totalCount,
        productsPerPage: productsPerPage,
        cartCount: state.cartCount,
        myCart: state.myCart,
        myFavorite: state.myFavorite,
        FavoriteCount: state.FavoriteCount,
        productDetails: state.productDetails,
        user: state.user,
      }}
    >
      {props.children}
    </clientContext.Provider>
  );
};

export default ClientContext;
