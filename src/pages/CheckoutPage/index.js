import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { emptyCart, getCart } from "../../utils/api_cart";
import { addNewOrder } from "../../utils/api_order";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });

  const addNewMutate = useMutation({
    mutationFn: addNewOrder,
    onSuccess: () => {
      navigate("/orders");
      emptyCart();
      queryClient.invalidateQueries({queryKey:["cart"]})
    },
    onError: (error) => {
      // if API call is error, do what?
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleSubmit = () => {
    if (name === "" || email === "") {
      enqueueSnackbar("Please fill up all the fields", {
        variant: "error",
      });
    } else if (!(cart && cart.length > 0)) {
      enqueueSnackbar("Your cart is empty", {
        variant: "error",
      });
    } else {
      addNewMutate.mutate({
        customerName: name,
        customerEmail: email,
        products: cart,
        totalPrice: calculateTotal(),
      });
    }
  };

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.quantity * item.price;
    });
    return total.toFixed(2);
  };
  return (
    <Container>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bolder", margin: "13px 0" }}
        >
          Checkout
        </Typography>
      </Box>
      <Navbar />
      <hr />
      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: "60px",
          flexDirection: {
            xs: "column-reverse",
            sm: "column-reverse",
            md: "row",
          },
        }}
      >
        <Grid item xs={12} md={7}>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ fontWeight: "bold" }}
          >
            Contact Information
          </Typography>

          <Typography>Name</Typography>
          <TextField
            required
            placeholder="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Typography>Email</Typography>
          <TextField
            required
            placeholder="email address"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            Pay ${calculateTotal()} now
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography
            variant="h5"
            textAlign="center"
            sx={{ fontWeight: "bold" }}
          >
            Your order summary
          </Typography>
          {/* .map here */}
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body1">
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">${calculateTotal()}</Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}