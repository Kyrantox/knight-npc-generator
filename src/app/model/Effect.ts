import { EFFECTS } from '../constants';

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
    } else if (data instanceof Effect) {
      this.copy(data);
    }
  }

  copy(base: Effect) {
    this.name = base.name;
    this.tags = [...base.tags];
    this.cost = base.cost;
  }

  toString() {
    return this.name;
  }
}

export const effects = EFFECTS.map(data => new Effect(data));