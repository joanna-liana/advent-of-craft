import { OutOfRangeException } from './OutOfRangeException';

export class FizzBuzz {
  private constructor() {}

  public static convert(input: number): string {
    if (input > 0) {
      if (input <= 100) {
        if (input % 3 === 0 && input % 5 === 0) {
          return 'FizzBuzz';
        }
        if (input % 3 === 0) {
          return 'Fizz';
        }
        if (input % 5 === 0) {
          return 'Buzz';
        }
        return input.toString();
      } else {
        throw new OutOfRangeException();
      }
    } else {
      throw new OutOfRangeException();
    }
  }
}
