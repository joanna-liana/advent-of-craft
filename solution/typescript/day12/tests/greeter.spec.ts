import {Greeter} from '../src/greeter';

describe('Greeter', () => {
  let greeter: Greeter;

  beforeEach(() => {
    greeter = new Greeter();
  });

  test('says Hello', () => {
    expect(greeter.greet()).toBe('Hello.');
  });

  test('says Hello Formally', () => {
    greeter.setFormality('formal');
    expect(greeter.greet()).toBe('Good evening, sir.');
  });

  test('says Hello Casually', () => {
    greeter.setFormality('casual');
    expect(greeter.greet()).toBe('Sup bro?');
  });

  test('says Hello Intimately', () => {
    greeter.setFormality('intimate');
    expect(greeter.greet()).toBe('Hello Darling!');
  });

  test('says Hello with custom formality', () => {
    greeter = new Greeter({
      default: 'Ahoy!',
      bestBuddies: 'Hey there',
      silence: ''
    });

    greeter.setFormality('intimate'); // unsupported formality
    expect(greeter.greet()).toBe('Ahoy!');

    greeter.setFormality('bestBuddies');
    expect(greeter.greet()).toBe('Hey there');

    greeter.setFormality('silence');
    expect(greeter.greet()).toBe('');
  });
});
