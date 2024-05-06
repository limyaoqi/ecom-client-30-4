import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SnackbarProvider, useSnackbar } from "notistack";
import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  TextField,
  Box,
} from "@mui/material";
import { updateProduct, getProduct } from "../../utils/api";

export default function ProductsEdit() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  // setup mutation for add new product
  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      enqueueSnackbar("Updated Successfully!", { variant: "success" });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // trigger the mutation to call the API
    updateProductMutation.mutate({
      id: id,
      name: name,
      description: description,
      price: price,
      category: category,
    });
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bolder", margin: "13px 0" }}
        >
          Welcome to My Store
        </Typography>
      </Box>
      <hr />
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              margin: "20px 0",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Add New Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleFormSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
