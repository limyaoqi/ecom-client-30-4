export function addToCart(product) {
  const products = JSON.parse(localStorage.getItem("cart")) || [];
  const productIndex = products.findIndex((p) => p._id === product._id);
  if (productIndex >= 0) {
    products[productIndex].quantity++;
  } else {
    products.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(products));
}

export function getCart() {
  return JSON.parse(localStorage.getItem("cart"));
}

export function removeProductFromCart(id) {
  const products = JSON.parse(localStorage.getItem("cart"));
  const updatedProducts = products.filter((p) => p._id !== id);
  localStorage.setItem("cart", JSON.stringify(updatedProducts));
}

export function emptyCart() {
  localStorage.removeItem("cart")
}
