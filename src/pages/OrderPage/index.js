import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOrder, getOrders, updateOrder } from "../../utils/api_order";
import { useState } from "react";
import { useSnackbar } from "notistack";

export default function OrderPage() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      enqueueSnackbar("Updated Order Status Successfully", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleEdit = (order, status) => {
    updateOrderMutation.mutate({
      ...order,
      status: status,
    });
  };

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      enqueueSnackbar("Deleted Order Status Successfully", {
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleDelete = (id) => {
    const result = window.confirm("Are you sure remove this cart?");
    if (result) {
      deleteOrderMutation.mutate(id);
    }
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell align="left">Products</TableCell>
            <TableCell align="left">Total Amount</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Payment Date</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell component="th" scope="row">
                <Typography>{order.customerName}</Typography>
                <Typography>({order.customerEmail})</Typography>
              </TableCell>
              <TableCell align="left">
                {order.products.map((product) => (
                  <Typography>{product.name}</Typography>
                ))}
              </TableCell>
              <TableCell align="left">{order.totalPrice}</TableCell>
              <TableCell align="left">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  value={order.status}
                  disabled={order.status === "pending"}
                  fullWidth
                  onChange={(e) => handleEdit(order, e.target.value)}
                >
                  <MenuItem value={"pending"}>Pending</MenuItem>
                  <MenuItem value={"paid"}>Paid</MenuItem>
                  <MenuItem value={"failed"}>Failed</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                </Select>
              </TableCell>
              <TableCell align="left">
                {order.status !== "pending" && order.paid_at}
              </TableCell>
              <TableCell align="right">
                {order.status === "pending" && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={()=>handleDelete(order._id)}
                  >
                    delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
