import LRUCache from "./lruCache";

const cache = new LRUCache<number>(2);
cache.put(1, 1); // cache {1(0): 1}
cache.put(2, 2); // cache {1(0): 1, 2(1): 2}
cache.get(1); // cache {1(1): 1, 2(1): 2} =>  1
cache.put(3, 3); // cache {1(1): 1, 3(2): 3}
cache.get(2); // cache {1(1): 1, 3(2): 3} => -1
cache.put(4, 4); // cache {4(2): 4, 3(2): 3}
cache.get(1); // cache {4(2): 4, 3(2): 3} => -1
cache.get(3); // cache {4(2): 4, 3(3): 3} => 3
cache.get(4); // cache {4(3): 4, 3(3): 3} => 3
// const cache = new LRUCache<string>(4);
// cache.put("a", "hello");
// cache.put("b", "is");
// cache.put("c", "it");
// cache.put("d", "me");
// cache.put("e", "you're");
// cache.get("d");
// cache.put("f", "looking");
console.log(String(cache));
