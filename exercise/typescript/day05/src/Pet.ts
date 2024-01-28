import { PetType } from './PetType';

export class Pet {
  constructor(
    public petType: PetType,
    public name: string,
    public age: number
  ) {}
}
