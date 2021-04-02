import { CAPACITIES } from '../constants';

export default class Capacity {
  name: string = '';
  index: string = '';
  description: string = '';
  tags: string[] = [];

  constructor(data?: string | Capacity) {
    if (typeof data === 'string' || data instanceof String) {
      const [name, tags, description] = data.split(' | ');

      this.name = name;
      this.description = description;
      this.tags = tags.split(' - ');
      this.index = (this.name + ' ' + this.tags.join(' ')).toLowerCase();
    } else if (data) {
      this.copy(data);
    }
  }

  copy(base: Capacity) {
    this.name = base.name;
    this.description = base.description;
    this.tags = [...base.tags];
  }
}

export const capacities = CAPACITIES.map(data => new Capacity(data));