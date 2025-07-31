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
    { key: '생산지', value: '' },
    { key: '꼬드 드 뉘 > 뉘 생 조르쥬', value: '꼬드 드 뉘 > 뉘 생 조르쥬' },
    { key: '꼬뜨 드 뉘', value: '꼬뜨 드 뉘' },
    { key: '꼬뜨 드 뉘 빌라쥐', value: '꼬뜨 드 뉘 빌라쥐' },
    { key: '꼬뜨 드 본', value: '꼬뜨 드 본' },
    { key: '꼬뜨 드 본 > 뫼르소', value: '꼬뜨 드 본 > 뫼르소' },
    { key: '꼬뜨 드 본 > 뽀마르', value: '꼬뜨 드 본 > 뽀마르' },
    { key: '꼬뜨 드 본 > 상뜨네', value: '꼬뜨 드 본 > 상뜨네' },
    { key: '꼬뜨 드 본 > 알록스 꼬르통', value: '꼬뜨 드 본 > 알록스 꼬르통' },
    { key: '마꼬네', value: '마꼬네' },
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

  return (
    <section className="absolute left-1/2 -translate-x-1/2 flex justify-center my-6">
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white/80 shadow-md rounded-2xl px-8 py-4">
        <div className="flex gap-4">
          <select
            onChange={(e) => {
              const newCountry = e.target.value;
              setCountry(newCountry);
              navigate(`/list`, {
                state: {
                  country: newCountry,
                  region,
                  wineType,
                },
              });
            }}
            className="font-montserrat w-28 h-10 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
          >
            {countries.map((country) => (
              <option key={country.key} value={country.value}>
                {country.key}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => {
              const newRegion = e.target.value;
              setRegion(newRegion);
              navigate(`/list`, {
                state: {
                  country,
                  region: newRegion,
                  wineType,
                },
              });
            }}
            className="font-montserrat w-56 h-10 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
          >
            {regions.map((region) => (
              <option key={region.key} value={region.value}>
                {region.key}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => {
              const newWineType = e.target.value;
              setWineType(newWineType);
              navigate(`/list`, {
                state: {
                  country,
                  region,
                  wineType: newWineType,
                },
              });
            }}
            className="font-montserrat w-28 h-10 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
          >
            {wineTypes.map((wineType) => (
              <option key={wineType.key} value={wineType.value}>
                {wineType.key}
              </option>
            ))}
          </select>
          <div className="flex justify-end items-center gap-2">
            <input
              type="text"
              placeholder="와인 이름 검색"
              className="font-pretendard w-full h-10 md:w-64 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A83E3E] transition"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              onClick={handleFilterIncludingKeyword}
              className="p-2 rounded-lg bg-[#A83E3E] text-white hover:bg-[#7a2229] transition"
              title="검색"
            >
              <Search />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WineFilter;
