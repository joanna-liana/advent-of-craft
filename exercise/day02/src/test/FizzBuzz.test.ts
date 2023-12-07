import { FizzBuzz } from '../FizzBuzz';
import { OutOfRangeException } from '../OutOfRangeException';

describe('FizzBuzz', () => {
  it('returns the given number for 1', () => {
    expect(FizzBuzz.convert(1)).toBe('1');
  });

  it('returns the given number for 67', () => {
    expect(FizzBuzz.convert(67)).toBe('67');
  });

  it('returns the given number for 82', () => {
    expect(FizzBuzz.convert(82)).toBe('82');
  });

  it('returns Fizz for 3', () => {
    expect(FizzBuzz.convert(3)).toBe('Fizz');
  });

  it('returns Fizz for 66', () => {
    expect(FizzBuzz.convert(66)).toBe('Fizz');
  });

  it('returns Fizz for 99', () => {
    expect(FizzBuzz.convert(99)).toBe('Fizz');
  });

  it('returns Buzz for 5', () => {
    expect(FizzBuzz.convert(5)).toBe('Buzz');
  });

  it('returns Buzz for 50', () => {
    expect(FizzBuzz.convert(50)).toBe('Buzz');
  });

  it('returns Buzz for 85', () => {
    expect(FizzBuzz.convert(85)).toBe('Buzz');
  });

  it('returns FizzBuzz for 15', () => {
    expect(FizzBuzz.convert(15)).toBe('FizzBuzz');
  });

  it('returns FizzBuzz for 30', () => {
    expect(FizzBuzz.convert(30)).toBe('FizzBuzz');
  });

  it('returns FizzBuzz for 45', () => {
    expect(FizzBuzz.convert(45)).toBe('FizzBuzz');
  });

  it('throws an exception for 0', () => {
    expect(() => FizzBuzz.convert(0)).toThrow(OutOfRangeException);
  });

  it('throws an exception for 101', () => {
    expect(() => FizzBuzz.convert(101)).toThrow(OutOfRangeException);
  });

  it('throws an exception for -1', () => {
    expect(() => FizzBuzz.convert(-1)).toThrow(OutOfRangeException);
  });
});
