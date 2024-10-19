export class Client {
  private totalAmount: number = 0;

  constructor(private readonly orderLines: Readonly<Record<string, number>>) {
  }

  toStatement(): string {
    this.calculateTotal();

    return this.generateStatement();
  }

  private generateStatement(): string {
    const lines = this.generateItemLines();

    return `${lines.join('\n')}\nTotal : ${this.totalAmount.toFixed(2)}€`;
  }

  private generateItemLines(): string[] {
    return Object.entries(this.orderLines)
      .map(([name, value]) => this.formatLine(name, value));
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }

  private calculateTotal(): void {
    this.totalAmount = Object.entries(this.orderLines)
      .reduce((total, [, value]) => {
        total += value;

        return total;
      }, 0);
  }

  private formatLine(name: string, value: number): string {
    return `${name} for ${value.toFixed(2)}€`;
  }
}
