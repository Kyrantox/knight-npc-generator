import { EFFECTS } from '../constants';
import { isString } from '../util';

export default class Effect {
  name: string = '';
  index: string = '';
  tags: string[] = [];
  cost: number = 0;

  constructor(data?: string | Effect) {
    if (typeof data === 'string' || data instanceof String) {
      const [name, tags, cost] = data.split(' | ');

      this.name = name;
      this.tags = tags.split(' - ');
      this.cost = Number(cost);
      this.index = (this.name + ' ' + this.tags.join(' ')).toLowerCase();
    } else if (data) {
      this.copy(data);
    }
  }

  copy(base: Effect) {
    this.name = isString(base.name) ? base.name : '';
    this.tags = Array.isArray(base.tags) ? base.tags.filter(t => isString(t)).map(t => t.toLowerCase()) : [];
    this.cost = Number.isFinite(base.cost) ? base.cost : 0;
  }

  raw() {
    return this.name.replace(/\(.+\)|[0-9]/g, '').trim();
  }

  toString() {
    return this.name;
  }
}

export const effects = EFFECTS.map(data => new Effect(data));