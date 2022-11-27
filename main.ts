import LRUCache from "./lruCache";

const numCache = new LRUCache<number>(2);
numCache.put(1, 1); // cache {1(0): 1}
numCache.put(2, 2); // cache {1(0): 1, 2(1): 2}
numCache.get(1); // cache {1(1): 1, 2(1): 2} =>  1
numCache.put(3, 3); // cache {1(1): 1, 3(2): 3}
numCache.get(2); // cache {1(1): 1, 3(2): 3} => -1
numCache.put(4, 4); // cache {4(2): 4, 3(2): 3}
numCache.get(1); // cache {4(2): 4, 3(2): 3} => -1
numCache.get(3); // cache {4(2): 4, 3(3): 3} => 3
numCache.get(4); // cache {4(3): 4, 3(3): 3} => 3
console.log("numCache\n", String(numCache));

const strCache = new LRUCache<string>(4);
strCache.put("a", "hello");
strCache.put("b", "is");
strCache.put("c", "it");
strCache.put("d", "me");
strCache.put("e", "you're");
strCache.get("d");
strCache.put("f", "looking");
console.log("strCache\n", String(strCache));
