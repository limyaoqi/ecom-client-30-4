import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../utils/api_user";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies(["currentUser"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      setCookie("currentUser", data, { maxAge: 3600 * 24 * 30 });
      enqueueSnackbar("Login Successfully", { variant: "success" });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });
  const handleSubmit = (e) => {
    if (email === "" || password === "") {
      enqueueSnackbar("Password and confirm password should be match", {
        variant: "error",
      });
    } else {
      e.preventDefault();
      loginMutation.mutate({
        email,
        password,
      });
    }
  };
  return (
    <Container>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h4"
          style={{ fontWeight: "bolder", margin: "13px 0" }}
        >
          Login
        </Typography>
      </Box>
      <Navbar />
      <hr />
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            border: "2px solid #ccc",
            borderRadius: "5px",
            width: "500px",
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
