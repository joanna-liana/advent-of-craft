export class Food {
  constructor(
    private readonly expirationDate: Date,
    private readonly approvedForConsumption: boolean,
    private readonly inspectorId: string | null
  ) {}

  public isEdible(now: Date): boolean {
    if (this.expirationDate > now &&
      this.approvedForConsumption &&
      this.inspectorId != null) {
      return true;
    } else {
      return false;
    }
  }
}
