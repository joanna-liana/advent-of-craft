export class Client {
  constructor(private readonly orderLines: Readonly<Record<string, number>>) {
  }

  toStatement(): string {
    const itemLines = this.generateItemLines();
    const totalAmount = this.getTotalAmount();

    return `${itemLines.join('\n')}\nTotal : ${totalAmount.toFixed(2)}€`;
  }

  private generateItemLines(): string[] {
    return Object.entries(this.orderLines)
      .map(([name, value]) => this.formatLine(name, value));
  }

  public getTotalAmount(): number {
    return Object.values(this.orderLines)
      .reduce((total, lineValue) => {
        total += lineValue;

        return total;
      }, 0);
  }

  private formatLine(name: string, value: number): string {
    return `${name} for ${value.toFixed(2)}€`;
  }
}
