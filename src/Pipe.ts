export default class Pipe<T> {
  _data: T;

  constructor(data: T) {
    this._data = data;
  }

  map<U>(pred: (data: T) => U): Pipe<U> {
    return new Pipe(pred(this._data));
  }

  fold(): T {
    return this._data;
  }
}
