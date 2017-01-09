import RandomNumberProvider from './ts_random';

export interface Lottery {
  name?: string;
  draw(): string;
}

export class MarkSix implements Lottery {
  constructor() {
  }

  draw(): string {
    return String(RandomNumberProvider(49, 6));
  }
}

export class RedBlue implements Lottery {
  constructor() {
  }

  draw(): string {
    return 'Red: ' + String(RandomNumberProvider(33, 6))
      + '\nBlue: ' + String(RandomNumberProvider(16, 1)[0]);
  }
}
