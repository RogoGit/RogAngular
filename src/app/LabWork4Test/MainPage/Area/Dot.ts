export class Dot {
  constructor(
    public x: string,
    public y: number,
    public r: string,
    public result: boolean
  ) {
  }

  get getColor(): string{
    return this.result ? 'green' : 'red';
  }

  // constructor(values: Object = {}) {
  // Object.assign(this, values);
  // }
}
