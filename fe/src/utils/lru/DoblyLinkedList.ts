type Key = string | number | symbol;

class Node {
  key: Key;
  value: unknown;
  prev: Node | null;
  next: Node | null;
  constructor(key: Key, value: unknown) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  head: Node | null;
  tail: Node | null;
  size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insertHead(node: Node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  swapToHead(node: Node) {
    this.remove(node);
    this.insertHead(node);
  }

  remove(node: Node) {
    const { prev, next } = node;
    if (prev === null && next === null) {
      // 노드가 하나일 때
      this.head = null;
      this.tail = null;
    }

    if (prev === null && next !== null) {
      // head 노드를 삭제할 때
      this.head = next;
      next.prev = null;
    }

    if (prev !== null && next === null) {
      // tail 노드를 삭제할 때
      this.tail = prev;
      prev.next = null;
    }

    if (prev !== null && next !== null) {
      // 중간 노드 삭제할 때
      prev.next = next;
      next.prev = prev;
    }

    node.next = null;
    node.prev = null;

    this.size--;
  }

  removeLastNode() {
    const node = this.tail;
    if (node === null) return;
    this.remove(node);
  }

  toString() {
    let node = this.head;
    const string = [];
    while (node !== null) {
      string.push(node.value);
      node = node.next;
    }
    return string.join('->');
  }
}

export { Node, DoublyLinkedList };
