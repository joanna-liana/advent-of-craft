import { Person } from '../Person';
import { Pet } from '../Pet';
import { PetType } from '../PetType';

let population: Person[];

beforeAll(() => {
  population = [
    new Person('Peter', 'Griffin').addPet(new Pet(PetType.CAT, 'Tabby', 2)),
    new Person('Stewie', 'Griffin')
      .addPet(new Pet(PetType.CAT, 'Dolly', 3))
      .addPet(new Pet(PetType.DOG, 'Brian', 9)),
    new Person('Joe', 'Swanson').addPet(new Pet(PetType.DOG, 'Spike', 4)),
    new Person('Lois', 'Griffin').addPet(new Pet(PetType.SNAKE, 'Serpy', 1)),
    new Person('Meg', 'Griffin').addPet(new Pet(PetType.BIRD, 'Tweety', 1)),
    new Person('Chris', 'Griffin').addPet(new Pet(PetType.TURTLE, 'Speedy', 4)),
    new Person('Cleveland', 'Brown')
      .addPet(new Pet(PetType.HAMSTER, 'Fuzzy', 1))
      .addPet(new Pet(PetType.HAMSTER, 'Wuzzy', 2)),
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
