import { EFFECTS } from '../constants';

export default class Effect {
  name: string = '';
  tags: string[] = [];
  cost: number = 0;

  constructor(data?: string | Effect) {
    if (data instanceof String) {
      const [name, tags, cost] = data.split(' | ');

      this.name = name;
      this.tags = tags.split(' - ');
      this.cost = Number(cost);
    } else if (data instanceof Effect) {
      this.name = data.name;
      this.tags = [...data.tags];
      this.cost = data.cost;
    }
  }

  toString() {
    return this.name;
  }
}

export const effects = EFFECTS.map(data => new Effect(data));