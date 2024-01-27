export class OutOfRangeException extends Error {
  constructor() {
    super('Input is out of range');
  }
}
