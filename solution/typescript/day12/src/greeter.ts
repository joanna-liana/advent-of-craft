interface GreetingVariants {
    default: string;
    formal: string;
    casual: string;
    intimate: string;
}

export class Greeter {
  private formality: string | null = null;

  constructor(private readonly config?: GreetingVariants) {
    this.config = config || {
      default: 'Hello.',
      formal: 'Good evening, sir.',
      casual: 'Sup bro?',
      intimate: 'Hello Darling!'
    };
  }

  greet(): string {
    if (this.formality == null) {
      return this.config.default;
    }

    if (this.formality === 'formal') {
      return this.config.formal;
    }

    if (this.formality === 'casual') {
      return this.config.casual;
    }

    if (this.formality === 'intimate') {
      return this.config.intimate;
    }

    return this.config.default;
  }

  setFormality(formality: string): void {
    this.formality = formality;
  }
}
