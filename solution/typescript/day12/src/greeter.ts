type GreetingVariants =  {
    default: string;
} & Record<string, string>

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
    return this.config[this.formality] ?? this.config.default;
  }

  setFormality(formality: string): void {
    this.formality = formality;
  }
}
