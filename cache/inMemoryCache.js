class InMemoryCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl) {
    const expiresAt = Date.now() + ttl * 1000;
    this.cache.set(key, { value, expiresAt });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  del(key) {
    this.cache.delete(key);
  }
}

module.exports = new InMemoryCache();
