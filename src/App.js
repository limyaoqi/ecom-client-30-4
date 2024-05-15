import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import ProductsAddNew from "./pages/ProductAddNew";
import ProductsEdit from "./pages/ProductsEdit";
import { SnackbarProvider } from "notistack";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import PaymentVerify from "./pages/PaymentVerify";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

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
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/verify_payment" element={<PaymentVerify />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
