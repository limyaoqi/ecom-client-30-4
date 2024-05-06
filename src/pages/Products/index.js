import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "../../utils/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  MenuItem,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import ProductCard from "../ProductCard";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function Products() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(1);
  const { data = [], refetch } = useQuery({
    queryKey: ["products", category, perPage, page],
    queryFn: () => getProducts(category, perPage, page),
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
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
      <Navbar />
      <hr />
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ fontWeight: "bolder" }}>
          Products
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/add")}
        >
          Add New
        </Button>
      </Box>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Genre"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}
      >
        <MenuItem value="all">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
      <Grid container spacing={12}>
        {data.map((product) => (
          <Grid key={product._id} item xs={12} md={6} lg={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
          padding: "20px 0",
        }}
      >
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <span>Page: {page}</span>
        <Button disabled={data.length === 0} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </Box>
    </Container>
  );
}
