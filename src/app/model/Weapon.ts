import { CONTACT, COURTE, LOINTAINE, LONGUE, MOYENNE } from '../constants';
import { isString } from '../util';
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
      this.name = isString(base.name) ? base.name : '';
      this.contact = !!base.contact;
      this.dices = Number.isFinite(base.dices) ? base.dices : 0;
      this.raw = Number.isFinite(base.raw) ? base.raw : 0;
      this.range = [CONTACT, COURTE, MOYENNE, LONGUE, LOINTAINE].includes(base.range?.toLowerCase?.()) ? base.range.toLowerCase() : (this.contact ? CONTACT : COURTE);
      this.effects = (Array.isArray(base.effects) ? base.effects : []).map(e => new Effect(e));
    }
  }

  addEffect() {
    this.effects.push(new Effect());
  }

  removeEffect(effect: Effect) {
    this.effects = this.effects.filter(e => e !== effect);
  }
}