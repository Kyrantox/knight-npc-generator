import { CONTACT } from '../constants';
import Effect from './Effect';

export default class Weapon {
  name: string = '';
  contact: boolean = true;
  dices: number = 0;
  raw: number = 0;
  range: string = CONTACT;
  effects: Effect[] = [];

  constructor(base?: Weapon) {
    if (base) {
      this.contact = base.contact;
      this.dices = base.dices;
      this.raw = base.raw;
      this.range = base.range;
      this.effects = base.effects.map(e => new Effect(e));
    }
  }

  addEffect() {
    this.effects.push(new Effect());
  }

  removeEffect(effect: Effect) {
    this.effects = this.effects.filter(e => e !== effect);
  }
}