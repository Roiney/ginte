const storage = {
  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set(key: string, value: any) {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};

export default storage;
