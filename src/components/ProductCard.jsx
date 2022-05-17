import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { ShoppingCart } from '@mui/icons-material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { clientContext } from "../context/ClientContext";
import { Link } from "react-router-dom";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  const data = React.useContext(clientContext);
  const {
    addProductToCart,
    checkProductInCart,
    deleteProductInCart,
    checkProductInFavorite,
    addProductToFavorite,
    deleteProductInFavorite,

    likeCounter,
  } = data;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/details/${item.id}`}>
        <CardHeader title={item.name} subheader={`${item.price} сом`} />
      </Link>
      <CardMedia
        className="product-card-image"
        component="img"
        height="194"
        image={item.image}
        alt={item.name}
      />
      <CardContent>
        <Typography
          className="product-card-desc"
          variant="body2"
          color="text.secondary"
        >
          {item.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          disabled={liked}
          onClick={() => {
            likeCounter(item.id, item.likes || 0);
            setLiked(true);
          }}
          aria-label="add to favorites"
        >
          <FavoriteIcon color={liked ? "error" : "info"} />
          <span>{item.likes}</span>
        </IconButton>

        {checkProductInFavorite(item.id) ? (
          <IconButton onClick={() => deleteProductInFavorite(item.id)}>
            <StarOutlineIcon color="error" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => addProductToFavorite(item)}
            aria-label="share"
          >
            <StarOutlineIcon color="inherit" />
          </IconButton>
        )}

        {checkProductInCart(item.id) ? (
          <IconButton onClick={() => deleteProductInCart(item.id)}>
            <ShoppingCartIcon color="info" />
          </IconButton>
        ) : (
          <IconButton onClick={() => addProductToCart(item)}>
            <ShoppingCartIcon color="inherit" />
          </IconButton>
        )}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse
        className="product-card-collapse"
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent>
          <Typography paragraph>{item.desc}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

//  this - это контекст
// контекст-это где мы пишем. Если мы пишем в глобал., это контекст window.
