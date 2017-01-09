import LUCKY_MSG from './ts_constants';

export class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
      return this.greeting + LUCKY_MSG;
  }
}
