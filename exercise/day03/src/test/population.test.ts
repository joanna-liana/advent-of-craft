import { Person } from '../Person';
import { PetType } from '../PetType';

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

test('whoOwnsTheYoungestPet', () => {
  const filtered = population.sort((a, b) => {
    const aMinAge = Math.min(...a.pets.map(pet => pet.age));
    const bMinAge = Math.min(...b.pets.map(pet => pet.age));
    return aMinAge - bMinAge;
  })[0];

  expect(filtered).toBeDefined();
  expect(filtered.firstName).toBe('Lois');
});
