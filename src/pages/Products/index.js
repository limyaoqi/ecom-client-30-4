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

export default function Products() {
  const [category, setCategory] = useState("all");
  const { data = [] } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getProducts(category),
  });
  console.log(data);
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
      <hr />
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ fontWeight: "bolder" }}>
          Products
        </Typography>
        <Button variant="contained" color="success">
          Add New
        </Button>
      </Box>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Genre"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <MenuItem value="all">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
      <Grid container spacing={3}>
        {data.map((product) => (
          <Grid key={product.id} item xs={4}>
            <Card>
              <CardContent>
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
                    {product.category}
                  </Typography>
                </Box>
                <Button fullWidth variant="contained" color="primary">
                  Add To Cart
                </Button>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" ,margin: "10px 0",}}
                >
                  <Button variant="contained" style={{borderRadius:"17px"}} color="primary">
                    Edit
                  </Button>
                  <Button variant="contained" style={{borderRadius:"17px"}} color="error">
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
