import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/logo2.jpg";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { CardTravel, Logout, ShoppingCart } from "@mui/icons-material";
import ProductCard from "./ProductCard";
import { clientContext } from "../context/ClientContext";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const data = React.useContext(clientContext);
  const { cartCount, authWithGoogle, user, logOut } = data;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <Link to="/">
                <img width={50} src={logo} alt="" />
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link to="/admin-panel">
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Admin Panel</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Link to="/">
                <img width={50} src={logo} alt="" />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/admin-panel">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  ADMIN PANEl
                </Button>
              </Link>
              <Link to="/admin-panel/add">
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  ADD PRODUCT
                </Button>
              </Link>
            </Box>
            <Box
              style={{ display: "flex", alignItems: "center" }}
              sx={{ flexGrow: 0 }}
            >
              <Link to="/favorite" style={{ marginRight: 10 }}>
                <Badge badgeContent={cartCount} color="error">
                  <StarOutlineIcon />
                </Badge>
              </Link>
              {/* //  {user ? ( */}
              {/* //   <>
              //     <Avatar
              //       style={{ marginRight: 10 }}
              //       src={user.photoURL}
              //       alt={user.displayname}
              //     />
              //     <span>{user.email}</span>
              //     <Button onClick={logOut}>
              //       <Logout color="error" />
              //     </Button>
              //   </>
              // ) : (
              //   <Button
              //     onClick={authWithGoogle}
              //     variant="outlined"
              //     color="error"
              //   >
              //     Войти
              //   </Button>
              // )} */}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};
export default Navbar;
