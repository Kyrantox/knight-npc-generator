export default class Aspect {
  name: string = '';
  score: number = 0;
  exceptional: number = 0;
  major: boolean = false;

  constructor(base?: Aspect) {
    if (base) {
      this.name = base.name;
      this.score = base.score;
      this.exceptional = base.exceptional;
      this.major = base.major;
    }
  }
}