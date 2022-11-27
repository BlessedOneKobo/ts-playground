import type { Nullable } from "./types";

export interface Node<T> {
  value: T;
  next: Nullable<Node<T>>;
  previous: Nullable<Node<T>>;
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
    const node: Node<T> = { value, next: this.#head, previous: null };

    if (this.#head === null) {
      this.#head = node;
    } else {
      this.#head.next = node;
    }

    if (this.#tail === null) {
      this.#tail = node;
    }

    this.#length += 1;
  }

  append(value: T) {
    const node: Node<T> = { value, next: null, previous: this.#tail };
    if (this.#head === null) {
      this.#head = node;
    }
    if (this.#tail) {
      this.#tail.next = node;
    }
    this.#tail = node;
    this.#length += 1;
  }

  moveValueToTail(value: T): boolean {
    if (this.#tail?.value === value) {
      return false;
    }

    let iter = this.#head;
    while (iter !== null && iter.value !== value) {
      iter = iter.next;
    }

    if (iter === null) {
      return false;
    }

    if (iter.previous) {
      iter.previous.next = iter.next;
    } else {
      this.#head = iter.next;
    }

    if (iter.next) {
      iter.next.previous = iter.previous;
    }

    iter.previous = this.#tail;

    if (this.#tail) {
      this.#tail.next = iter;
    }
    iter.next = null;
    this.#tail = iter;
    return true;
  }

  unshift(): T | undefined {
    if (this.#head === null) {
      return undefined;
    }

    const val = this.#head.value;
    if (this.#head.next) {
      this.#head.next.previous = null;
    }
    this.#head = this.#head.next;
    this.#length -= 1;
    return val;
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
