import { DoublyLinkedList, Node } from '../DoblyLinkedList';
import { describe, expect, test } from 'vitest';

describe('linkedList의 insertHead를 통해 노드를 추가할 수 있다.', () => {
  test('값을 넣을 때 마다 head에 들어가는 지 확인', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.insertHead(new Node(1, 1));
    linkedList.insertHead(new Node(2, 2));
    linkedList.insertHead(new Node(3, 3));
    expect(linkedList.toString()).toBe([3, 2, 1].join('->'));
  });

  test('제대로 사이즈를 측정하는 지 확인', () => {
    const linkedList = new DoublyLinkedList();
    linkedList.insertHead(new Node(1, 1));
    linkedList.insertHead(new Node(2, 2));
    linkedList.insertHead(new Node(3, 3));
    expect(linkedList.size).toBe(3);
  });
});

describe('linkedList의 removeLastNode를 통해 tail 노드를 삭제할 수 있다.', () => {
  test('노드가 하나일 때', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    linkedList.insertHead(nodeOne);
    linkedList.removeLastNode();
    expect(linkedList.toString()).toBe('');
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });
  test('노드가 여러개 일 때 removeLastNode를 여러번 호출', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    const nodeTwo = new Node(2, 2);
    const nodeThree = new Node(3, 3);
    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.removeLastNode();
    expect(linkedList.size).toBe(2);
    expect(linkedList.toString()).toBe([3, 2].join('->'));
    linkedList.removeLastNode();
    expect(linkedList.size).toBe(1);
    expect(linkedList.toString()).toBe([3].join('->'));

    linkedList.removeLastNode();
    linkedList.removeLastNode();

    expect(linkedList.toString()).toBe('');
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });
});

describe('linkedList의 remove 통해 노드를 삭제할 수 있다.', () => {
  test('노드가 하나일 때 삭제', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    linkedList.insertHead(nodeOne);
    linkedList.remove(nodeOne);
    expect(linkedList.toString()).toBe('');
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test('head 노드 삭제', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    const nodeTwo = new Node(2, 2);
    const nodeThree = new Node(3, 3);
    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.remove(nodeThree);
    expect(linkedList.toString()).toBe([2, 1].join('->'));
  });

  test('중간 노드 삭제', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    const nodeTwo = new Node(2, 2);
    const nodeThree = new Node(3, 3);
    const nodeFour = new Node(4, 4);
    const nodeFive = new Node(5, 5);

    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.insertHead(nodeFour);
    linkedList.insertHead(nodeFive);
    linkedList.remove(nodeThree);
    expect(linkedList.toString()).toBe([5, 4, 2, 1].join('->'));
  });

  test('tail 노드 삭제', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    const nodeTwo = new Node(2, 2);
    const nodeThree = new Node(3, 3);
    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.remove(nodeOne);
    expect(linkedList.toString()).toBe([3, 2].join('->'));
  });
});

describe('linkedList의 swapToHead 통해 head로 node를 스왑할 수 있다.', () => {
  test('노드가 하나일 때 스왑', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);

    linkedList.insertHead(nodeOne);

    linkedList.swapToHead(nodeOne);
    expect(linkedList.toString()).toBe([1].join('->'));
    expect(linkedList.size).toBe(1);
  });

  test('head 노드 스왑', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    const nodeTwo = new Node(2, 2);
    const nodeThree = new Node(3, 3);
    const nodeFour = new Node(4, 4);
    const nodeFive = new Node(5, 5);

    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.insertHead(nodeFour);
    linkedList.insertHead(nodeFive);

    linkedList.swapToHead(nodeFive);
    expect(linkedList.toString()).toBe([5, 4, 3, 2, 1].join('->'));
    expect(linkedList.size).toBe(5);
  });

  test('중간 노드 스왑을 제대로 하는지', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    const nodeTwo = new Node(2, 2);
    const nodeThree = new Node(3, 3);
    const nodeFour = new Node(4, 4);
    const nodeFive = new Node(5, 5);

    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.insertHead(nodeFour);
    linkedList.insertHead(nodeFive);

    linkedList.swapToHead(nodeThree);
    expect(linkedList.toString()).toBe([3, 5, 4, 2, 1].join('->'));
    expect(linkedList.size).toBe(5);
  });

  test('tail 노드 스왑을 제대로 하는지', () => {
    const linkedList = new DoublyLinkedList();
    const nodeOne = new Node(1, 1);
    const nodeTwo = new Node(2, 2);
    const nodeThree = new Node(3, 3);
    const nodeFour = new Node(4, 4);
    const nodeFive = new Node(5, 5);

    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.insertHead(nodeFour);
    linkedList.insertHead(nodeFive);

    linkedList.swapToHead(nodeOne);
    expect(linkedList.toString()).toBe([1, 5, 4, 3, 2].join('->'));
    expect(linkedList.size).toBe(5);
  });
});
