import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../utils/api";
import { addToCart } from "../../utils/api_cart";
import { useCookies } from "react-cookie";

export default function ProductCard({ product }) {
  const [cookie] = useCookies("currentUser");
  const { currentUser = {} } = cookie;
  const { loginuser = {} } = currentUser;
  const { role, token } = loginuser;
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      enqueueSnackbar("Deleted Successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    const result = window.confirm("Are you sure delete this product?");
    if (result) {
      deleteMutation.mutate({ id: product._id, token });
    }
  };

  const addCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      enqueueSnackbar("Add to Cart Successfully", { variant: "success" });
      // if API call is success, do what?
    },
    onError: (error) => {
      // if API call is error, do what?
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleAddToCart = (event) => {
    event.preventDefault();
    // trigger the mutation to call the API
    if (loginuser && loginuser.email) {
      addCartMutation.mutate(product);
    } else {
      enqueueSnackbar("Please login first", { variant: "error" });
    }
  };
  console.log(product);
  return (
    <Card>
      <CardContent>
        <img
          src={
            "http://localhost:8888/" +
            (product.image && product.image !== ""
              ? product.image
              : "uploads/image.png")
          }
          width={"100%"}
          height={"200px"}
        />
        <Typography fontWeight={"bold"}>{product.name}</Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          <Typography
            variant="p"
            style={{ backgroundColor: "#EBFBEE", color: "#6ACF7E" }}
          >
            {product.price}
          </Typography>
          <Typography
            variant="p"
            style={{ backgroundColor: "#FFF4E6", color: "#FD882B" }}
          >
            {product.category && product.category.name
              ? product.category.name
              : null}
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
        {role && role === "admin" && (
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to={`/products/${product._id}`}
              style={{ borderRadius: "17px" }}
              color="primary"
            >
              Edit
            </Button>
            <Button
              variant="contained"
              style={{ borderRadius: "17px" }}
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
