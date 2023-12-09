import { Pet } from './Pet';

export class Person {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly pets: Pet[] = []
  ) {}

  addPet(pet: Pet): Person {
    this.pets.push(pet);
    return this;
  }
}
