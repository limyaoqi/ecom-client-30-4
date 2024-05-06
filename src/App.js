import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import ProductsAddNew from "./pages/ProductAddNew";
import ProductsEdit from "./pages/ProductsEdit";
import { SnackbarProvider } from "notistack";
import Cart from "./pages/Cart";

function App() {
  const queryClient = new QueryClient();

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={1500}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/add" element={<ProductsAddNew />} />
            <Route path="/products/:id" element={<ProductsEdit />} />
            <Route path="/cart" element={<Cart />} />

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
