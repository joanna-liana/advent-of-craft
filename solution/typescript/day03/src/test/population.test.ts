import { Person } from '../Person';
import { Pet } from '../Pet';
import { PetType } from '../PetType';

describe('Population', () => {
  let population: Person[];
  let expectedYoungestPetOwner: Person;

  beforeEach(() => {
    expectedYoungestPetOwner = new Person('Lois', 'Griffin')
      .addPet(new Pet(PetType.SNAKE, 'Serpy', 1));

    population = [
      new Person('Peter', 'Griffin').addPet(new Pet(PetType.CAT, 'Tabby', 2)),
      new Person('Stewie', 'Griffin')
        .addPet(new Pet(PetType.CAT, 'Dolly', 3))
        .addPet(new Pet(PetType.DOG, 'Brian', 9)),
      new Person('Joe', 'Swanson').addPet(new Pet(PetType.DOG, 'Spike', 4)),
      expectedYoungestPetOwner,
      new Person('Meg', 'Griffin').addPet(new Pet(PetType.BIRD, 'Tweety', 1)),
      new Person('Chris', 'Griffin')
        .addPet(new Pet(PetType.TURTLE, 'Speedy', 4)),
      new Person('Cleveland', 'Brown')
        .addPet(new Pet(PetType.HAMSTER, 'Fuzzy', 1))
        .addPet(new Pet(PetType.HAMSTER, 'Wuzzy', 2)),
      new Person('Glenn', 'Quagmire')
    ];
  });

  const findYoungestPetAge = (person: Person) => {
    const petsByAge = [...person.pets]
      .sort((petA, petB) => petA.age - petB.age);
    const youngestPet = petsByAge[0];

    return youngestPet?.age;
  };


  test('who owns the youngest pet', () => {
    const populationByYoungestPet = population.sort((personA, personB) => {
      const aPetAge = findYoungestPetAge(personA);
      const bPetAge = findYoungestPetAge(personB);

      return aPetAge - bPetAge;
    });

    const youngestPetOwner = populationByYoungestPet[0];

    expect(youngestPetOwner).toBe(expectedYoungestPetOwner);
  });

});
