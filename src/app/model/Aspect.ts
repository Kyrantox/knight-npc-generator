export default class Aspect {
  score: number = 0;
  minor: number = 0;
  major: number = 0;

  constructor(base?: Aspect) {
    if (base) {
      this.score = base.score;
      this.minor = base.minor;
      this.major = base.major;
    }
  }
}