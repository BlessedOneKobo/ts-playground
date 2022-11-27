import LinkedList from "./linkedList";

class LRUCache<T> {
  #capacity: number;
  #cache: Map<string, T>;
  #ageList: LinkedList<string>;

  constructor(capacity: number) {
    if (capacity < 1) {
      throw new Error(`Invalid capacity: ${capacity}`);
    }

    this.#cache = new Map<string, T>();
    this.#capacity = capacity;
    this.#ageList = new LinkedList();
  }

  get(key: string | number): T | undefined {
    const strKey = String(key);

    const value = this.#cache.get(strKey);
    if (value === undefined) {
      return undefined;
    }

    this.#ageList.moveValueToTail(strKey);
    return value;
  }

  put(key: string | number, value: T) {
    const strKey = String(key);
    if (this.get(strKey) !== undefined) {
      this.#cache.set(strKey, value);
      return;
    }

    if (this.#ageList.length < this.#capacity) {
      this.#cache.set(strKey, value);
      this.#ageList.append(strKey);
      return;
    }

    const lruValue = this.#ageList.unshift();
    if (lruValue) {
      this.#cache.delete(lruValue);
      this.#cache.set(strKey, value);
      this.#ageList.append(strKey);
    }
  }

  toString(): string {
    let str = "{\n";

    for (const [k, v] of this.#cache) {
      str += `  ['${k}']: ${v}\n`;
    }

    return str + "}\n";
  }
}

export default LRUCache;
