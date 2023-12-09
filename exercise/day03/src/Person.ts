import { Pet } from './Pet';
import { PetType } from './PetType';

export class Person {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly pets: Pet[] = []
  ) {}

  addPet(petType: PetType, name: string, age: number): Person {
    this.pets.push(new Pet(petType, name, age));
    return this;
  }
}
