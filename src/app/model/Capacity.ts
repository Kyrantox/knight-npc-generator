import { CAPACITIES } from '../constants';
import Effect, { effects } from './Effect';

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

  raw() {
    return this.name.replace(/\(.+\)|[0-9]/g, '').trim();
  }
}

const capacities = CAPACITIES.map(data => new Capacity(data));
capacities.push(...effects.filter(e => e.tags.includes('bande')).map(effect => {
  const capacity = new Capacity();

  capacity.name = effect.name;
  capacity.description = "Le PNJ bénéficie de l'équivalent de l'effet " + capacity.name + '.';
  capacity.tags = ['effet', ...effect.tags.filter(tag => ['bande', 'recrue', 'initié', 'héros', 'autre'].includes(tag))];
  capacity.index = (capacity.name + ' ' + capacity.tags.join(' ')).toLocaleLowerCase();

  return capacity;
}));

export { capacities };