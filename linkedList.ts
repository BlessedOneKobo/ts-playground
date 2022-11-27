import type { Nullable } from "./types";

export interface Node<T> {
  value: T;
  next: Nullable<Node<T>>;
}

export default class LinkedList<T> {
  #head: Nullable<Node<T>>;
  #tail: Nullable<Node<T>>;
  #length: number;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }

  prepend(value: T) {
    const node: Node<T> = { value, next: null };
    this.#length += 1;
    if (this.#head === null) {
      this.#head = node;
      this.#tail = node;
      return;
    }

    const currHead = this.#head;
    node.next = currHead;
    this.#head = node;
  }

  append(value: T) {
    const node: Node<T> = { value, next: null };
    this.#length += 1;
    if (this.#tail === null) {
      this.#head = node;
      this.#tail = node;
      return;
    }

    const currTail = this.#tail;
    currTail.next = node;
    this.#tail = node;
  }

  removeAt(indexToRemove: number): T {
    if (
      indexToRemove < 0 ||
      indexToRemove >= this.#length ||
      this.#head === null
    ) {
      throw new Error(`Index ${indexToRemove} is out-of-bounds`);
    }

    let iter = this.#head;
    let prevIter = iter;
    for (let idx = 0; idx < indexToRemove && iter.next !== null; idx += 1) {
      prevIter = iter;
      iter = iter.next;
    }

    prevIter.next = iter.next;
    return iter.value;
  }

  unshift(): T {
    if (this.#head === null) {
      throw new Error("Cannot unshift from empty linked list");
    }

    const currHead = this.#head;
    this.#head = currHead.next;
    return currHead.value;
  }

  pop(): T {
    if (this.#tail === null) {
      throw new Error("Cannot pop from empty linked list");
    }

    return this.removeAt(this.#length - 1);
  }

  toString(): string {
    let str = "";

    let iter = this.#head;
    while (iter !== null) {
      str += `[${iter.value}] -> `;
      iter = iter.next;
    }
    return `${str}[x]`;
  }

  get length(): number {
    return this.#length;
  }
}
