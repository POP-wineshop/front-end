// API 관련 공통 유틸리티 함수들

const API_BASE_URL = 'http://localhost:8080/api'; // API의 기본 URL

export const apiRequest = async <T>(
  endpoint: string, // 호출할 API의 endpoint (예: '/users')
  options: RequestInit = {} // fetch에 전달할 옵션 객체 (method, headers, body 등)
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`; // 전체 요청 URL 생성

  try {
    // fetch 함수에 옵션을 전달할 때, options 객체의 모든 속성을 스프레드로 복사
    // (예: method, body 등)
    // headers도 병합해서 전달하는데, 기본적으로 'Content-Type'을 json으로 지정하고,
    // options.headers에 추가적인 헤더가 있으면 그것도 함께 병합됨
    const response = await fetch(url, {
      ...options, // options 객체의 모든 속성을 복사 (method, body 등)
      headers: {
        'Content-Type': 'application/json', // 기본 Content-Type 지정
        ...options.headers, // 사용자가 추가로 넘긴 헤더가 있으면 덮어씀
      },
    });

    // 응답이 정상(2xx)이 아니면 에러 발생
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답 데이터를 JSON으로 파싱해서 반환
    return await response.json();
  } catch (error) {
    // 에러 발생 시 콘솔에 에러 로그 출력 후 다시 throw
    console.error('API request failed:', error);
    throw error;
  }
};

export const showSuccessMessage = (message: string): void => {
  alert(message);
  // TODO: 토스트 알림 시스템으로 대체
};

export const showErrorMessage = (message: string): void => {
  alert(message);
  // TODO: 토스트 알림 시스템으로 대체
};

export const reloadPage = (): void => {
  window.location.reload();
  // TODO: 상태 업데이트로 대체
};
