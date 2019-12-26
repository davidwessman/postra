function checkStorage(key: string): any {
  if (localStorage.getItem(key)) {
    try {
      const data: any | null = localStorage.getItem(key);
      if (data === null) {
        return null;
      }
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);
      throw e;
    }
  }
}

function saveToStorage(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export { checkStorage, saveToStorage };
