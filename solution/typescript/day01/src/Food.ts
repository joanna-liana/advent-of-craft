import { isBefore } from 'date-fns';

export class Food {
  constructor(
    private readonly expirationDate: Date,
    private readonly approvedForConsumption: boolean,
    private readonly inspectorId: string | null
  ) {}

  public isEdible(now: Date): boolean {
    const hasBeenCheckedByInspector = !!this.inspectorId;
    const isApprovedByInspector = this.approvedForConsumption &&
      hasBeenCheckedByInspector;

    return this.hasNotExpiredBy(now) && isApprovedByInspector;
  }

  private hasNotExpiredBy(now: Date) {
    return isBefore(now, this.expirationDate);
  }
}
