interface CacheValue<T> {
  value: T;
  age: number;
}

type CacheEntry<T> = Map<string, CacheValue<T>>;

const AGE_UPPER_SENTINEL = 100000 + 1;

class LRUCache<T> {
  #cache: CacheEntry<T>;
  #capacity: number;
  #size: number;
  #maxAge: number;

  constructor(capacity: number) {
    if (capacity < 1) {
      throw new Error(`Invalid capacity: ${capacity}`);
    }

    this.#cache = new Map<string, CacheValue<T>>();
    this.#capacity = capacity;
    this.#size = 0;
    this.#maxAge = 0;
  }

  get(key: string | number): T | undefined {
    if (!key) {
      throw new Error(`Invalid key: '${key}'`);
    }

    const entry = this.#cache.get(String(key));
    if (entry === undefined) {
      return undefined;
    }

    for (const [k, v] of this.#cache) {
      if (k !== String(key)) {
        v.age -= 1;
      }
    }

    entry.age += 1;
    if (entry.age > this.#maxAge) {
      this.#maxAge = entry.age;
    }
    return entry.value;
  }

  put(key: string | number, value: T): void {
    if (this.#size < this.#capacity) {
      this.#cache.set(String(key), { value, age: this.#maxAge });
      this.#size += 1;
      this.#maxAge += 1;
      return;
    }

    let minKey = "";
    let minAge = AGE_UPPER_SENTINEL;

    for (const [k, v] of this.#cache) {
      if (v.age < minAge) {
        minAge = v.age;
        minKey = k;
      }
    }

    if (minKey) {
      this.#cache.delete(minKey);
      this.#cache.set(String(key), { value, age: this.#maxAge });
      this.#maxAge += 1;
    }
  }

  toString(): string {
    let str = "{\n";

    for (const [k, v] of this.#cache) {
      str += `  [age=${v.age}]['${k}']: ${v.value}\n`;
    }

    return str + "}";
  }
}

export default LRUCache;
