import React, { useEffect, useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import { CreateContainer, MainContainer } from "./components";
// import Header from "./components/Header";
// import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
// import Navbar from "./components/Navbar";
// import AddProductPage from "./pages/AddProductPage";
// import AdminPage from "./pages/AdminPage";
// import CardPage from "./pages/CartPage";
// import EditProductPage from "./pages/EditProductPage";
// import HomePage from "./pages/HomePage";
// import ProductDetailsPage from "./pages/ProductDetailsPage";
import ClientContext from "./context/ClientContext";
import AdminContext from "./context/AdminContext";
import Navigation from "./Navigation";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ClientContext>
      <AdminContext>
        <Navigation />
      </AdminContext>
    </ClientContext>
  );
};

export default App;
