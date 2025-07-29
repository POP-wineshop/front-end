import { useParams } from 'react-router-dom';
import { WineListQuery } from '../model/wineTypes';

// 와인 정보 조회
export async function fetchWineDetail() {
  const { wineId } = useParams();
  const url = new URL(`http://localhost:8080/api/wines/${wineId}`);
  const res = await fetch(url);
  const jsonRes = await res.json();
  return jsonRes.data;
}

// 전체 와인 목록 조회 or 조건에 부합하는 와인 목록 조회
export async function fetchWineList(query: WineListQuery) {
  const url = new URL('http://localhost:8080/api/wines/search');
  const params = new URLSearchParams();

  if (query.country) params.append('country', query.country);
  if (query.region) params.append('region', query.region);
  if (query.wineType) params.append('wineType', query.wineType);
  if (query.keyword) params.append('keyword', query.keyword);

  // url 객체의 origin과 pathname을 분리해서 사용하면, 쿼리스트링 중복, 불필요한 문자, 파싱 오류 등 방지 가능
  // params.toString()으로 쿼리스트링만 따로 생성해서 붙이면, 주소 조합의 명확성, 예측 가능성, 유지보수성 향상
  const finalUrl = `${url.origin}${url.pathname}?${params.toString()}`;

  const res = await fetch(finalUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // user 기능에서 selector 구현 후 적용할 것
      // Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('와인 목록 조회 오류 발생');
  }
  const jsonRes = await res.json();
  return jsonRes.data;
}
