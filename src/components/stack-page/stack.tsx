interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clearAll: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = []

  push = (item: T): void => {
    this.container.push(item)
  }

  pop = (): void => {
    this.container.pop()
  }

  peak = (): T | null => {
    let size = this.getSize();
    if (this.getSize()) return this.container[size - 1];
    else return null;
  }

  getSize = () => this.container.length

  clearAll = (): void => {
    this.container = []
  }
}