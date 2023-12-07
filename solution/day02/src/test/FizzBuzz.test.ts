import { FizzBuzz } from '../FizzBuzz';
import { OutOfRangeException } from '../OutOfRangeException';

describe('FizzBuzz', () => {
  it.each([
    {
      givenNumber: 1,
      expectedOutput: '1'
    },
    {
      givenNumber: 67,
      expectedOutput: '67'
    },
    {
      givenNumber: 82,
      expectedOutput: '82'
    }
  ])(
    'returns the given number directly if it is not divisible by either 3 or 5',
    ({ givenNumber, expectedOutput }) => {
      expect(FizzBuzz.convert(givenNumber)).toBe(expectedOutput);
    }
  );

  it.each([
    3, 66, 99
  ])('returns Fizz for a number divisible by 3 - %s', (divisibleBy3) => {
    expect(FizzBuzz.convert(divisibleBy3)).toBe('Fizz');
  });

  it.each([
    5, 50, 85
  ])('returns Buzz for a number divisible by 5 - %s', (divisibleBy3) => {
    expect(FizzBuzz.convert(divisibleBy3)).toBe('Buzz');
  });

  it.each([
    15, 30, 45
  ])(
    'returns FizzBuzz for a number divisible by both 3 and 5 - %s',
    (divisibleBy3And5) => {
      expect(FizzBuzz.convert(divisibleBy3And5)).toBe('FizzBuzz');
    }
  );

  describe('accepted input range', () => {
    describe('FizzBuz throws an exception', () => {
      it('for a value just below the min threshold', () => {
        expect(() => FizzBuzz.convert(0)).toThrow(OutOfRangeException);
      });

      it('for a value just above the max threshold', () => {
        expect(() => FizzBuzz.convert(101)).toThrow(OutOfRangeException);
      });
    });

    describe('FizzBuz does not throw an exception', () => {
      it('for a value equal to the min threshold', () => {
        expect(() => FizzBuzz.convert(1)).not.toThrow();
      });

      it('for a value equal to the max threshold', () => {
        expect(() => FizzBuzz.convert(100)).not.toThrow();
      });
    });
  });
});
