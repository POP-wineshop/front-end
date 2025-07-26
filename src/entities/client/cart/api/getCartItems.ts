export async function getCartItems() {
  const response = await fetch(`http://localhost:8080/api/carts`, {
    headers: {
      Authorization: `${localStorage.getItem('Access Token')}`,
    },
  });
  return response.json();
}
