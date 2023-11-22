const storage = {
  // 값을 저장하는 함수
  set: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },

  // 값을 가져오는 함수
  get: (key: string) => {
    return localStorage.getItem(key);
  },

  // 특정 키의 값을 삭제하는 함수
  remove: (key: string) => {
    return localStorage.removeItem(key);
  },

  // 모든 값을 삭제하는 함수
  clear: () => {
    localStorage.clear();
  },
};

export default storage;
