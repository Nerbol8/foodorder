import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

const FiltersBlock = ({ getProducts }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const filter = new URLSearchParams(location.search);

  const [searchValue, setSearchValue] = useState(filter.get("q") || "");
  const [roastValue, setRoastValue] = useState(filter.get("roasting") || "");
  const [sizeValue, setSizeValue] = useState(filter.get("size") || "");

  const handleFilters = (key, value) => {
    filter.set(key, value);
    navigate(`${location.pathname}?${filter.toString()}`);
    setSearchValue(filter.get("q") || "");
    setRoastValue(filter.get("roasting") || "");
    setSizeValue(filter.get("size") || "");
    getProducts();
  };

  const resetFilter = () => {
    setSearchValue("");
    setRoastValue("");
    setSizeValue("");
    navigate("/");
    getProducts();
  };

  return (
    <div className="filters-block">
      <TextField
        variant="standard"
        value={searchValue}
        onChange={(e) => handleFilters("q", e.target.value)}
        type="search"
        label="Живой поиск"
      />
      <FormControl variant="standard">
        <InputLabel id="color-label">roast </InputLabel>
        <Select
          value={roastValue}
          onChange={(e) => handleFilters("roasting", e.target.value)}
          label="roast"
          labelId="color-label"
        >
          <MenuItem value="not">not</MenuItem>
          <MenuItem value="rare">rare</MenuItem>
          <MenuItem value="medium rare">medium rare</MenuItem>
          <MenuItem value="meidum">medium</MenuItem>
          <MenuItem value="medium well">medium well</MenuItem>
          <MenuItem value="well done">well done</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel id="size-label">size </InputLabel>
        <Select
          value={sizeValue}
          onChange={(e) => handleFilters("size", e.target.value)}
          label="size"
          labelId="size-label"
        >
          <MenuItem value="0.5">0.5</MenuItem>
          <MenuItem value="0.7">0.7</MenuItem>
          <MenuItem value="1">1</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" color="primary" onClick={resetFilter}>
        Сбросить
      </Button>
    </div>
  );
};

export default FiltersBlock;
