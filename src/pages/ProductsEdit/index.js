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
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { updateProduct, getProduct, getCategories } from "../../utils/api";
import { uploadImage } from "../../utils/api_images";
import { useCookies } from "react-cookie";

export default function ProductsEdit() {
  const [cookie] = useCookies("currentUser");
  const { currentUser = {} } = cookie;
  const { loginuser = {} } = currentUser;
  const { token } = loginuser;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  // load the categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  useEffect(() => {
    if (product) {
      console.log(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setImage(product.image ? product.image : "");
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
      image: image,
      token: token,
    });
  };

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log(data);
      setImage(data.image_url);
      enqueueSnackbar("Image Upload Successfully!", { variant: "success" });
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleImageUpload = (event) => {
    uploadImageMutation.mutate(event.target.files[0]);
  };

  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  console.log(image);

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
              <FormControl
                sx={{ marginTop: "10px", width: "200px", marginLeft: "10px" }}
              >
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                  labelId="product-select-label"
                  id="product-select"
                  label="Product"
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    // reset the page to 1
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  {categories.map((category) => {
                    return (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            {image !== "" ? (
              <>
                <div>
                  <img
                    src={"http://localhost:8888/" + image}
                    width="300px"
                    height="300px"
                  />
                </div>
                <Button onClick={() => setImage("")}>Remove Image</Button>
              </>
            ) : (
              <input
                type="file"
                multiple={false}
                onChange={handleImageUpload}
              />
            )}
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
