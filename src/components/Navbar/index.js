import { Box, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyCart } from "../../utils/api_cart";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies("currentUser");
  const { currentUser = {} } = cookie;
  const { loginuser = {} } = currentUser;
  const { role } = loginuser;

  return (
    <Box style={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
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
        <Button
          onClick={() => navigate("/orders")}
          style={{
            backgroundColor:
              location.pathname === "/orders" ? "blue" : "inherit",
            color: location.pathname === "/orders" ? "white" : "blue",
          }}
        >
          Order
        </Button>
        {role && role === "admin" && (
          <Button
            onClick={() => navigate("/category")}
            style={{
              backgroundColor:
                location.pathname === "/category" ? "blue" : "inherit",
              color: location.pathname === "/category" ? "white" : "blue",
            }}
          >
            Categories
          </Button>
        )}
      </Box>
      {loginuser ? (
        <Button
          onClick={() => {
            removeCookie("currentUser");
            emptyCart();
            navigate("/login");
          }}
          style={{
            backgroundColor:
              location.pathname === "/login" ? "blue" : "inherit",
            color: location.pathname === "/login" ? "white" : "blue",
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Box>
            <Button
              onClick={() => navigate("/login")}
              style={{
                backgroundColor:
                  location.pathname === "/login" ? "blue" : "inherit",
                color: location.pathname === "/login" ? "white" : "blue",
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              style={{
                backgroundColor:
                  location.pathname === "/signup" ? "blue" : "inherit",
                color: location.pathname === "/signup" ? "white" : "blue",
              }}
            >
              SignUp
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
