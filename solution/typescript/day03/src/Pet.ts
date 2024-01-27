import { PetType } from './PetType';

export class Pet {
  constructor(
    public readonly petType: PetType,
    public readonly name: string,
    public readonly age: number
  ) {}
}
