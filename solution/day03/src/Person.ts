import { Pet } from './Pet';

export class Person {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    private _pets: Pet[] = []
  ) {}

  get pets(): ReadonlyArray<Pet> {
    return this._pets;
  }

  addPet(pet: Pet): Person {
    this._pets.push(pet);
    return this;
  }
}
