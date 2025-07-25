import { useParams } from 'react-router-dom';

export default async function getWineDetail() {
  const { wineId } = useParams();
  const url = new URL(`http://localhost:8080/api/wines/${wineId}`);
  const res = await fetch(url);
  const jsonRes = await res.json();
  return jsonRes.data;
}
