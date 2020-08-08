import generateDiff = Mocha.reporters.Base.generateDiff;

export class RandomNameGenerator {
  public static generate (): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
