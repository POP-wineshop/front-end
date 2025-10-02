import { useParams } from 'react-router-dom';
import { WineData, WineListQuery } from '../model.test/wineTypes.test';
import { fetchWineList } from '../api/wineApi';

// fetch 함수 모킹을 위한 예시 코드
// 테스트 환경에서 실제 네트워크 요청을 막고, 원하는 응답을 반환하도록 설정합니다.
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('fetchWineList', () => {
  it('정상적으로 데이터를 반환한다', async () => {
    // 1. 테스트용 mock 데이터 준비
    const mockWineList: WineData[] = [
      {
        id: 1,
        price: 30000,
        vintage: 2020,
        country: '프랑스',
        grapeVariety: '메를로',
        region: '보르도',
        alcoholContent: 13,
        imageUrl: 'wine1.jpg',
        tasteProfile: { sweetness: 2, acidity: 3, body: 4 },
        wineType: 'RED',
        stock: 10,
        korName: '샤또 마고',
        engName: 'Chateau Margaux',
      },
    ];

    // 2. fetch 모킹: 정상 응답 반환
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockWineList }),
    });

    // 3. 쿼리 파라미터 준비
    const query: WineListQuery = { country: '프랑스' };

    // 4. 함수 호출 및 결과 검증
    const result = await fetchWineList(query);

    // 5. 결과가 mock 데이터와 일치하는지 확인
    expect(result).toEqual(mockWineList);

    // 6. fetch가 올바른 URL로 호출되었는지 확인
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('country=프랑스'),
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('에러 응답 시 예외를 던진다', async () => {
    // fetch 모킹: 실패 응답 반환 (예: status 500)
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: 'Internal Server Error' }),
    });

    const query: WineListQuery = { country: '프랑스' };

    // 함수 호출 및 에러 검증
    await expect(fetchWineList(query)).rejects.toThrow(
      '와인 목록 조회 오류 발생'
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('다양한 쿼리 파라미터를 전달하면 fetch가 올바른 URL로 호출된다', async () => {
    // fetch 모킹: 정상 응답 반환
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });

    const query: WineListQuery = {
      country: '프랑스',
      region: '보르도',
      wineType: 'RED',
      keyword: '마고',
    };

    await fetchWineList(query);

    // fetch가 호출된 URL을 검증
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('country=프랑스'),
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('region=보르도'),
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('wineType=RED'),
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('keyword=마고'),
      expect.any(Object)
    );
  });
});

// 와인 정보 조회
export async function fetchWineInfo() {
  const { wineId } = useParams();
  const url = new URL(`http://localhost:8080/api/wines/${wineId}`);
  const res = await fetch(url);
  const jsonRes = await res.json();
  return jsonRes.data;
}
