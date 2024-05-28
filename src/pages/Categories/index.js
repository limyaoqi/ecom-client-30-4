import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../../utils/api";
import { useSnackbar } from "notistack";
import {
  addNewCategory,
  deleteCategory,
  updateCategory,
} from "../../utils/api_category";
import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Categories() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [cookie] = useCookies("currentUser");
  const { currentUser = {} } = cookie;
  const { loginuser = {} } = currentUser;
  const { token } = loginuser;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState("");

  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });

  const addNewMutate = useMutation({
    mutationFn: addNewCategory,
    onSuccess: () => {
      enqueueSnackbar("Add Category Successfully", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (error) => {
      // if API call is error, do what?
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addNewMutate.mutate({
      name: name,
      token: token,
    });
  };

  const editMutate = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      enqueueSnackbar("Update Category Successfully", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["category"] });
      setOpenEditModal(false)
    },
    onError: (error) => {
      // if API call is error, do what?
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleUpdate = () => {
    editMutate.mutate({
      id: editId,
      name: editName,
      token: token,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      enqueueSnackbar("Deleted Successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["category"] });
      setName("");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleDelete = (id) => {
    const result = window.confirm("Are you sure delete this product?");
    if (result) {
      deleteMutation.mutate({ id: id, token });
    }
  };

  const handleClose = () => {
    setOpenEditModal(false);
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
      <Navbar />
      <hr />
      <Typography variant="h4" fontWeight={"bolder"} margin={"20px 0 10px 0"}>
        Categories
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        border={"2px solid #ccc"}
        borderRadius={"2px"}
        padding={"0 10px"}
        margin={"10px 0"}
        component="form"
        onSubmit={handleFormSubmit}
      >
        <TextField
          placeholder="Category Name"
          variant="outlined"
          margin="normal"
          style={{ flexGrow: 1, marginRight: "8px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ height: "56px", marginTop: "8px" }}
          type="submit"
        >
          Add
        </Button>
      </Box>
      <Table
        sx={{
          border: "2px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell width={"70%"}>{category.name}</TableCell>
                <TableCell>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: "5px" }}
                      onClick={() => {
                        setOpenEditModal(true);
                        setEditId(category._id);
                        setEditName(category.name);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2}>No categories found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog
        open={openEditModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent
          sx={{
            paddingTop: "10px",
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ width: "100%", marginTop: "15px" }}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleUpdate();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
