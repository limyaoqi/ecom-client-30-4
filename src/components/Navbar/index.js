import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: location.pathname === "/" ? "blue" : "inherit",
          color: location.pathname === "/" ? "white" : "blue",
        }}
      >
        Home
      </Button>
      <Button
        onClick={() => navigate("/cart")}
        style={{
          backgroundColor: location.pathname === "/cart" ? "blue" : "inherit",
          color: location.pathname === "/cart" ? "white" : "blue",
        }}
      >
        Cart
      </Button>
    </Box>
  );
}
