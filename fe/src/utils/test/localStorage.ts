type Keys = keyof never;

export function storage() {
  // eslint-disable-next-line
  const storage: Record<Keys, any> = {};

  return {
    // eslint-disable-next-line
    setItem: function (key: Keys, value: any) {
      storage[key] = value || '';
    },
    getItem: function (key: Keys) {
      return key in storage ? storage[key] : null;
    },
    removeItem: function (key: Keys) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function (i: number) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: function () {
      Object.keys(storage).forEach((key) => {
        delete storage[key];
      });
    },
  };
}
