interface ILinkedList<T> {
  append: (element: T) => void
  prepend: (element: T) => void
  insertAt: (element: T, position: number) => void
  removeAt: (index: number) => void
  find: (index: number) => void
  getSize: () => number
}

class Node<T> {
  value: T
  next: Node<T> | null

  constructor(value: T, next?: Node<T> | null) {
    this.value = value
    this.next = (next === undefined ? null : next)
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialArray: T[]) {
    this.head = null;
    this.size = 0;
    initialArray.forEach(el => this.insertAt(el, 0))
  }

  append = (element: T) => {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node
    } else {
      let el = this.head
      while (el.next) {
        el = el.next
      }
      el.next = node
    }
    this.size++;
  }

  prepend = (value: T) => {
    const node = new Node(value)

    if (!this.head) {
      this.head = node
    }

    node.next = this.head
    this.head = node
    this.size++
  }

  insertAt = (element: T, index: number) => {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index');
      return;
    } else {
      const node = new Node(element);
      if (index === 0) {
        node.next = this.head
        this.head = node
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prevNode

        while (currIndex < index) {
          if (curr) {
            currIndex++
            prevNode = curr
            curr = curr.next
          }
        }
        node.next = curr
        if (prevNode) {
          prevNode.next = node
        }
      }
      this.size++;
    }
  }

  removeAt = (index: number) => {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index')
      return
    } else {

      let curr = this.head
      if (curr && index === 0) {
        this.head = curr.next
      } else {
        for (let i = 0; curr != null && i < index - 1; i++) {
          curr = curr.next
        }

        if (curr == null || curr.next == null) return null
        const { next } = curr.next
        curr.next = next
      }

      this.size --
    }
  }

  find = (index: number) => {
    if (index < 0 || index > this.size) {
      console.log('Enter a valid index')
      return
    } 

    let currentNode = this.head
    let count = 0

    while (currentNode) {
      if (count === index) {
        return currentNode.value
      }
      count++
      currentNode = currentNode.next
    }

    return null
  }

  getSize = () => this.size
}