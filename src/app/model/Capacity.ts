import { CAPACITIES } from '../constants';

export default class Capacity {
  name: string = '';
  description: string = '';
  tags: string[] = [];

  constructor(data?: string | Capacity) {
    if (data instanceof String) {
      const [name, tags, description] = data.split(' | ');

      this.name = name;
      this.description = description;
      this.tags = tags.split(' - ');
    } else if (data instanceof Capacity) {
      this.name = data.name;
      this.description = data.description;
      this.tags = [...data.tags];
    }
  }
}

export const capacities = CAPACITIES.map(data => new Capacity(data));