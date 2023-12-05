import { isBefore } from 'date-fns';

export class Food {
  constructor(
    private readonly expirationDate: Date,
    private readonly approvedForConsumption: boolean,
    private readonly inspectorId: string | null
  ) {}

  public isEdible(now: Date): boolean {
    return this.hasNotExpiredBy(now) && this.isApprovedByInspector();
  }

  private hasNotExpiredBy(now: Date) {
    return isBefore(now, this.expirationDate);
  }

  private isApprovedByInspector() {
    return this.approvedForConsumption && this.hasBeenCheckedByInspector;
  }

  private get hasBeenCheckedByInspector() {
    return !!this.inspectorId;
  }
}
