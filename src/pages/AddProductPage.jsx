import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { adminContext } from "../context/AdminContext";

const AddProductPage = () => {
  const data = React.useContext(adminContext);

  const { addProduct } = data;

  const [newProduct, setNewProduct] = useState({
    name: "",
    desc: "",
    price: "$",
    image: "",
    size: "",
    roasting: "",
    feedbacks: [],
    likes: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    for (let key in newProduct) {
      let value = newProduct[key];
      if (typeof value === "string") {
        if (!value.trim()) {
          alert("Заполните поля!");
          return;
        }
      }
    }
    addProduct(newProduct);
    setNewProduct({
      name: "",
      desc: "",
      price: "",
      image: "",
      size: "",
      roasting: "",
    });
  };

  return (
    <Container>
      <div className="add-edit-page">
        <h1>Add product</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            value={newProduct.name}
            label="name"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, desc: e.target.value })
            }
            value={newProduct.desc}
            label="description"
            variant="standard"
          />
          <TextField
            type="number"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: parseInt(e.target.value) })
            }
            value={newProduct.price}
            label="price"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            value={newProduct.image}
            label="photo"
            variant="standard"
          />
          <FormControl variant="standard">
            <InputLabel id="color-select-label">Rare level</InputLabel>
            <Select
              onChange={(e) =>
                setNewProduct({ ...newProduct, roasting: e.target.value })
              }
              value={newProduct.roasting}
              label="roast"
              labelId="color-select-label"
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
            <InputLabel id="size-select-label">size</InputLabel>
            <Select
              onChange={(e) =>
                setNewProduct({ ...newProduct, size: e.target.value })
              }
              value={newProduct.size}
              label="size"
              labelId="size-select-label"
            >
              <MenuItem value="s">0.5</MenuItem>
              <MenuItem value="m">0.7</MenuItem>
              <MenuItem value="l">1</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="outlined">
            ADD
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddProductPage;
