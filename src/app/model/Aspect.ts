import { isString } from '../util';

export default class Aspect {
  name: string = '';
  id: number = 0;
  score: number = 0;
  exceptional: number = 0;
  major: boolean = false;

  constructor(base?: Aspect) {
    if (base) {
      this.name = isString(base.name) ? base.name : '';
      this.score = Number.isFinite(base.score) ? base.score : 0;
      this.exceptional = Number.isFinite(base.exceptional) ? base.exceptional : 0;
      this.major = !!base.major;
    }
  }
}