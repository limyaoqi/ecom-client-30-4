import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  TextField,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { addProduct, getCategories } from "../../utils/api";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

export default function ProductsAddNew() {
  const [cookie] = useCookies("currentUser");
  const { currentUser = {} } = cookie;
  const { loginuser = {} } = currentUser;
  const { token } = loginuser;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  // setup mutation for add new product
  const addNewMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      enqueueSnackbar("Add Product Successfully", { variant: "success" });
      // if API call is success, do what?
      navigate("/");
    },
    onError: (error) => {
      // if API call is error, do what?
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // trigger the mutation to call the API
    addNewMutation.mutate({
      name: name,
      description: description,
      price: price,
      category: category,
      token: token,
    });
  };

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
      <hr />{" "}
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
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Genre"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
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
