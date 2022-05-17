import { Container, TableFooter } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { clientContext } from "../context/ClientContext";

const rows = [];

const FavoritePage = () => {
  const data = React.useContext(clientContext);
  const { getProdFromFavorite, myFavorite, changeCountProductInFavorite } =
    data;

  //   console.log(myFavorite);

  useEffect(() => {
    getProdFromFavorite();
  }, []);

  if (!myFavorite) {
    return <h2>Loading!</h2>;
  }

  if (myFavorite.products.length === 0) {
    return <h2>No favorite</h2>;
  }

  return (
    <div>
      <Container>
        <h2>Favorite</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">name</TableCell>
                <TableCell align="center">photo</TableCell>
                <TableCell align="center">price</TableCell>
                <TableCell align="center">amount</TableCell>
                <TableCell align="center">total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myFavorite.products.map((item) => (
                <TableRow
                  key={item.product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {item.product.name}
                  </TableCell>
                  <TableCell align="center">
                    <img width={100} src={item.product.image} alt="" />
                  </TableCell>
                  <TableCell align="center">{item.product.price} сом</TableCell>
                  <TableCell align="center">
                    <input
                      min={1}
                      onChange={(e) =>
                        changeCountProductInFavorite(
                          item.product.id,
                          e.target.value
                        )
                      }
                      type="number"
                      value={item.count}
                    />
                  </TableCell>
                  <TableCell align="center">{item.subPrice} $</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="right" colSpan={4}>
                  <h2>Total price</h2>
                </TableCell>
                <TableCell align="center">
                  <h2>{myFavorite.totalPrice} $</h2>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default FavoritePage;
