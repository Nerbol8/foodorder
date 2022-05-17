import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminContext } from "../context/AdminContext";

const EditProductPage = () => {
  const data = React.useContext(adminContext);
  const { getProductsToEdit, productToEdit, saveEditedProduct } = data;

  const params = useParams();
  const navigate = useNavigate();
  // console.log(productToEdit)

  const [editedProduct, setEditedProduct] = useState(productToEdit);

  // console.log(newProduct)

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let key in editedProduct) {
      let value = editedProduct[key];
      if (typeof value === "string") {
        if (!value.trim()) {
          alert("Заполните поля!");
          return;
        }
      }
    }

    saveEditedProduct(editedProduct);
    navigate("/admin-panel");
  };

  useEffect(() => {
    getProductsToEdit(params.id);
  }, []);

  useEffect(() => {
    setEditedProduct(productToEdit);
  }, [productToEdit]);

  if (!editedProduct) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container>
      <div className="add-edit-page">
        <h2>Edit product</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, name: e.target.value })
            }
            value={editedProduct.name}
            label="name"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, desc: e.target.value })
            }
            value={editedProduct.desc}
            label="description"
            variant="standard"
          />
          <TextField
            type="number"
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                price: parseInt(e.target.value),
              })
            }
            value={editedProduct.price}
            label="price"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, image: e.target.value })
            }
            value={editedProduct.image}
            label="photo"
            variant="standard"
          />
          <FormControl variant="standard">
            <InputLabel id="roast-select-label">Roast </InputLabel>
            <Select
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, roasting: e.target.value })
              }
              value={editedProduct.roasting}
              label="Выберите прожарку"
              labelId="roast-select-label"
            >
              <MenuItem value="not">not</MenuItem>
              <MenuItem value="rare">rare</MenuItem>
              <MenuItem value="medium rare">medium rare</MenuItem>
              <MenuItem value="medium">medium</MenuItem>
              <MenuItem value="medium well">medium well</MenuItem>
              <MenuItem value="well done">well done</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel id="size-select-label">Size</InputLabel>
            <Select
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, size: e.target.value })
              }
              value={editedProduct.size}
              label="Выберите размер"
              labelId="size-select-label"
            >
              <MenuItem value="0.5">0.5</MenuItem>
              <MenuItem value="0.7">0.7</MenuItem>
              <MenuItem value="l">1</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="outlined">
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditProductPage;
