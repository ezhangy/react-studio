import "./App.css";
import BakeryItem from "./components/BakeryItem.js"
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import Grid from '@mui/material/Unstable_Grid2'
import { Box, Typography } from "@mui/material"

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  const [cart, setCart] = useState({})
  /* add your cart state code here */
  function handleClick(item) {
    var newQuantity = 1
    if (item.name in cart) {
      newQuantity = cart[item.name].quantity + 1
    }
    setCart({...cart, [item.name]: {quantity: newQuantity, price: item.price}})
  }

  return (
    <Grid container spacing={4} sx={{px: 12, py: 2}}>
      <Grid xs={9} spacing={10}>
        <h1>My Bakery</h1> {/* TODO: personalize your bakery (if you want) */}
        <Grid container spacing={2}>
          {bakeryData.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
            <Grid key={index} xs={4}>
              <BakeryItem 
                item={item}
                handleClick={handleClick}
              />
            </Grid> 
          ))}
        </Grid>
      </Grid>
      <Grid xs>
        <h2>Cart</h2>
        {Object.keys(cart).map((itemName) => (
          <Typography mt={2} key={itemName}>
            {cart[itemName].quantity}x {itemName}
          </Typography>
        ))} {/* TODO: render a list of items in the cart */}
          {Object.keys(cart).length === 0 ? (
            <Typography fontStyle='italic'>Your cart is empty</Typography>
          ) : (
            <Typography mt={2}>
              Total: ${Object.keys(cart).reduce(
                (prevTotal, itemName) => (
                  prevTotal + (cart[itemName].quantity * cart[itemName].price)
                ), 0
              )}
            </Typography>
          )}
      </Grid>
    </Grid>
  );
}

export default App;