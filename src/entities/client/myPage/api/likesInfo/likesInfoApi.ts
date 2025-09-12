export const readLikesItemList = async () => {
  const response = await fetch(`http://localhost:8080/api/wines`);
  const data = await response.json();
  return data;
};
