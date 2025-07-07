import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WineFilter = () => {
  const countries = [
    { key: '생산국', value: '' },
    { key: '프랑스', value: '프랑스' },
    { key: '이탈리아', value: '이탈리아' },
    { key: '스페인', value: '스페인' },
    { key: '독일', value: '독일' },
    { key: '미국', value: '미국' },
    { key: '호주', value: '호주' },
    { key: '뉴질랜드', value: '뉴질랜드' },
    { key: '칠레', value: '칠레' },
    { key: '아르헨티나', value: '아르헨티나' },
  ];

  const regions = [
    '생산지',
    '꼬드 드 뉘 > 뉘 생 조르쥬',
    '꼬뜨 드 뉘',
    '꼬뜨 드 뉘 빌라쥐',
    '꼬뜨 드 본',
    '꼬뜨 드 본 > 뫼르소',
    '꼬뜨 드 본 > 뽀마르',
    '꼬뜨 드 본 > 상뜨네',
    '꼬뜨 드 본 > 알록스 꼬르통',
    '마꼬네',
  ];

  const wineTypes = [
    { key: '와인종류', value: '' },
    { key: '레드', value: 'RED' },
    { key: '화이트', value: 'WHITE' },
    { key: '로제', value: 'ROSE' },
    { key: '스파클링', value: 'SPARKLING' },
    { key: '디저트', value: 'DESSERT' },
  ];

  const navigate = useNavigate();

  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [wineType, setWineType] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const handleNavigateToFilteredList = () => {
      navigate(`/list`, {
        state: {
          country,
          region,
          wineType,
        },
      });
    };

    handleNavigateToFilteredList();
  }, [country, region, wineType]);

  const handleFilterIncludingKeyword = () => {
    navigate(`/list`, {
      state: {
        country,
        region,
        wineType,
        keyword,
      },
    });
  };

  // const handleSearchWines = () => {
  //   const url = new URL('http://localhost:8080/api/wines/search');
  //   const params = new URLSearchParams(url.search);

  //   if (country) params.append('country', country);
  //   if (region) params.append('region', region);
  //   if (wineType) params.append('wineType', wineType);
  //   if (keyword) params.append('keyword', keyword);

  //   const finalUrl = `${url.origin}${url.pathname}?${params.toString()}`;

  //   fetch(finalUrl)
  //     .then((res) => res.json())
  //     .then((jsonRes) => {
  //       console.log(jsonRes);
  //       alert(`와인 조회 성공!
  //         url : ${finalUrl}
  //         국가 / 지역 : ${country} > ${region}
  //         종류 : ${wineType}
  //         키워드 : ${keyword}`);
  //       // 전역 변수로 와인 목록 컴포넌트에 들어갈 와인 데이터 상태 변경
  //       navigate(
  //         `/list?country=${country}&region=${region}&wineType=${wineType}&keyword=${keyword}`
  //       );
  //     })
  //     .catch((error) =>
  //       alert(`와인 조회 실패 ㅠ
  //         국가 / 지역 : ${country} > ${region}
  //         종류 : ${wineType}
  //         키워드 : ${keyword}
  //         에러: ${error}`)
  //     );
  // };

  return (
    <>
      <div className="wine-filter-search flex justify-between items-center my-8 px-8 w-full min-w-[700px] mx-auto">
        <div className="wine-filter flex gap-4 items-center">
          <div className="wine-filter-country items-center">
            <select
              onChange={(e) => setCountry(e.target.value)}
              className="w-32 p-2 rounded border border-[#D4D4D4] text-[#171717] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6A1B1A] transition duration-200 ease-in-out"
            >
              {countries.map((country) => (
                <option key={country.key} value={country.value}>
                  {country.key}
                </option>
              ))}
            </select>
          </div>

          <div className="wine-filter-region items-center">
            <select
              onChange={(e) => setRegion(e.target.value)}
              className="w-32 p-2 rounded border border-[#D4D4D4] text-[#171717] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6A1B1A] transition duration-200 ease-in-out"
            >
              {regions.map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="wine-filter-wineType items-center">
            <select
              onChange={(e) => setWineType(e.target.value)}
              className="w-32 p-2 rounded border border-[#D4D4D4] text-[#171717] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6A1B1A] transition duration-200 ease-in-out"
            >
              {wineTypes.map((wineType) => (
                <option key={wineType.key} value={wineType.value}>
                  {wineType.key}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="wine-search flex items-center justify-end">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="와인 이름을 적어주세요!"
              className="w-64 p-2 rounded border border-[#D4D4D4] text-[#171717] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6A1B1A] transition duration-200 ease-in-out"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              onClick={handleFilterIncludingKeyword}
              className="p-2 rounded text-white bg-[#6A1B1A] hover:bg-[#4E1212] shadow-sm transition duration-200 ease-in-out"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WineFilter;
