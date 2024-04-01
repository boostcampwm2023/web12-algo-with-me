import { DoublyLinkedList, Node } from './DoblyLinkedList';

type Key = string | number | symbol;

export class LRU {
  maxSize: number;
  map: Map<Key, Node>;
  list: DoublyLinkedList;
  constructor(maxSize: number) {
    this.maxSize = maxSize;
    this.map = new Map();
    this.list = new DoublyLinkedList();
  }
  get(key: Key) {
    if (!this.map.has(key)) return false;

    // 현재 값 제일 최신으로 업데이트
    const node = this.map.get(key) as Node;
    this.list.swapToHead(node);
    return node.value;
  }

  set(key: Key, value: unknown) {
    const newNode = new Node(key, value);

    if (this.map.size === this.maxSize) {
      // 가장 오래된 값 제거
      const lastNode = this.list.tail as Node;
      this.list.remove(lastNode);
      this.map.delete(lastNode.key);
    }
    this.map.set(key, newNode);
    this.list.insertHead(newNode);
  }
  toMapString() {
    const info: string[] = [];
    this.map.forEach((_, key) => {
      info.push(key as string);
    });
    return info.join(',');
  }
  toLinkedListString() {
    return this.list.toString();
  }
}
