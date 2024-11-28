export class Storage {
  static onFind(key) {
    return localStorage.getItem(key) || "";
  }

  static onStore(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  static onFindDecoded(key) {
    const value = localStorage.getItem(key);
    if (!value) return;

    return atob(value);
  }

  static onStoreEncoded(key, value) {
    if (!key || !value) return;

    const data = btoa(value);
    localStorage.setItem(key, data);
  }

  static onRemove(key) {
    localStorage.removeItem(key);
  }
}
