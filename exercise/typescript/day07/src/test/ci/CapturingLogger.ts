import { Logger } from '../../ci/dependencies/Logger';

export class CapturingLogger implements Logger {
  private readonly lines: string[] = [];

  info(message: string): void {
    this.lines.push('INFO: ' + message);
  }

  error(message: string): void {
    this.lines.push('ERROR: ' + message);
  }

  getLoggedLines(): string[] {
    return this.lines;
  }
}
