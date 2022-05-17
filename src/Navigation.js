import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProductPage from "./pages/AddProductPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import EditProductPage from "./pages/EditProductPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { AnimatePresence } from "framer-motion";
import MainContainer from "./components/MainContainer";
import CreateContainer from "./components/CreateContainer";
import Header from "./components/Header";
import OrderPage from "./pages/OrderPage";
import FavoritePage from "./pages/FavoritePage";

const Navigation = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <Navbar />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/admin-panel" element={<AdminPage />} />
            <Route path="/admin-panel/add" element={<AddProductPage />} />
            <Route path="/admin-panel-edit/:id" element={<EditProductPage />} />
            <Route path="/h" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/details/:id" element={<ProductDetailsPage />} />
            <Route path="/orderform" element={<OrderPage />} />
            <Route path="/favorite" element={<FavoritePage />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default Navigation;
