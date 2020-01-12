function checkStorage(key) {
  if (localStorage.getItem(key)) {
    try {
      const data = localStorage.getItem(key);
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

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { checkStorage, saveToStorage };
