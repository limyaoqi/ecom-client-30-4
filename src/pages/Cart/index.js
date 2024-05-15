import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart, removeProductFromCart } from "../../utils/api_cart";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: carts=[] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
  });
  const [total, setTotal] = useState(0);

  const calculateTotal = (cartItems) => {
    let totalPrice = 0;
    cartItems.forEach((cart) => {
      totalPrice += cart.price * cart.quantity;
    });
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    if (carts) {
      const totalPrice = calculateTotal(carts);
      setTotal(totalPrice);
    }
  }, [carts]);

  const deleteMutation = useMutation({
    mutationFn: removeProductFromCart,
    onSuccess: () => {
      enqueueSnackbar("Deleted Successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleDelete = (id) => {
    // e.preventDefault();
    // console.log(id);
    const result = window.confirm("Are you sure remove this cart?");
    if (result) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Container>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bolder", margin: "13px 0" }}
        >
          My Orders
        </Typography>
      </Box>
      <Navbar />
      <hr />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Total</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carts && carts.length > 0 ? (
            carts.map((cart) => (
              <TableRow key={cart._id}>
                <TableCell component="th" scope="row">
                  {cart.name}
                </TableCell>
                <TableCell align="left">{cart.price}</TableCell>
                <TableCell align="left">{cart.quantity}</TableCell>
                <TableCell align="left">
                  ${(cart.price * cart.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(cart._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell component="th" scope="row">
                No Product Added Yet
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell component="th" scope="row"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">${total}</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                disabled={!(carts && carts.length > 0)}
                component={Link}
                to={"/checkout"}
              >
                Checkout
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
}
