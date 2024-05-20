import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userSignup } from "../../utils/api_user";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

export default function SignUpPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["currentUser"]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const signUpMutation = useMutation({
    mutationFn: userSignup,
    onSuccess: (data) => {
      setCookie(data);
      enqueueSnackbar("Sign Up Successfully", { variant: "success" });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      enqueueSnackbar("All fields are required", { variant: "error" });
    } else if (password !== password2) {
      enqueueSnackbar("Password must be match.", { variant: "danger" });
    } else {
      signUpMutation.mutate({
        name,
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
          Sign Up
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
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
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
          <TextField
            label="Confirm Password"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
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
