import { Pet } from './Pet';
import { PetType } from './PetType';

export class Person {
  public pets: Pet[];

  constructor(
    public firstName: string,
    public lastName: string,
    pets?: Pet[]
  ) {
    this.pets = pets || [];
  }

  addPet(petType: PetType, name: string, age: number): Person {
    this.pets.push(new Pet(petType, name, age));
    return this;
  }
}
