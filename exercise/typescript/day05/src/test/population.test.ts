
import { Person } from '../Person';
import { PetType } from '../PetType';

const lineSeparator = '\n';
let population: Person[];

beforeAll(() => {
  population = [
    new Person('Peter', 'Griffin').addPet(PetType.CAT, 'Tabby', 2),
    new Person('Stewie', 'Griffin')
      .addPet(PetType.CAT, 'Dolly', 3)
      .addPet(PetType.DOG, 'Brian', 9),
    new Person('Joe', 'Swanson').addPet(PetType.DOG, 'Spike', 4),
    new Person('Lois', 'Griffin').addPet(PetType.SNAKE, 'Serpy', 1),
    new Person('Meg', 'Griffin').addPet(PetType.BIRD, 'Tweety', 1),
    new Person('Chris', 'Griffin').addPet(PetType.TURTLE, 'Speedy', 4),
    new Person('Cleveland', 'Brown')
      .addPet(PetType.HAMSTER, 'Fuzzy', 1)
      .addPet(PetType.HAMSTER, 'Wuzzy', 2),
    new Person('Glenn', 'Quagmire')
  ];
});

test('peopleWithTheirPets', () => {
  const response = formatPopulation();

  expect(response.toString()).toBe(
    `Peter Griffin who owns : Tabby${lineSeparator}` +
    `Stewie Griffin who owns : Dolly Brian${lineSeparator}` +
    `Joe Swanson who owns : Spike${lineSeparator}` +
    `Lois Griffin who owns : Serpy${lineSeparator}` +
    `Meg Griffin who owns : Tweety${lineSeparator}` +
    `Chris Griffin who owns : Speedy${lineSeparator}` +
    `Cleveland Brown who owns : Fuzzy Wuzzy${lineSeparator}` +
    'Glenn Quagmire'
  );
});

function formatPopulation(): string {
  let response = '';

  for (const person of population) {
    response += `${person.firstName} ${person.lastName}`;

    if (person.pets.length > 0) {
      response += ' who owns :';
    }

    for (const pet of person.pets) {
      response += ` ${pet.name}`;
    }

    if (population[population.length - 1] !== person) {
      response += lineSeparator;
    }
  }
  return response;
}

test('whoOwnsTheYoungestPet', () => {
  const filtered = population
    .sort(
      (a, b) => youngestPetAgeOfThePerson(a) - youngestPetAgeOfThePerson(b)
    )[0];

  expect(filtered.firstName).toBe('Lois');
});

function youngestPetAgeOfThePerson(person: Person): number {
  return Math.min(...person.pets.map(pet => pet.age));
}
