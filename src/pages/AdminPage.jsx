import { Container } from "@mui/material";
import React, { useEffect } from "react";
import AdminTable from "../components/AdminTable";
import { adminContext } from "../context/AdminContext";

const AdminPage = () => {
  const data = React.useContext(adminContext);
  const { getProducts, products } = data;

  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <div>
        <h1>Админ панель</h1>
        <AdminTable products={products} />
      </div>
    </Container>
  );
};

export default AdminPage;
