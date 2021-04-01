import { ASPECTS_LABELS, GRID, HOSTILE, RECRUE } from '../constants';
import Aspect from './Aspect';
import Capacity from './Capacity';
import Weapon from './Weapon';

export class Npc {
  name: string = '';
  type: string = HOSTILE;
  level: string = RECRUE;
  aspects: Aspect[] = [new Aspect(), new Aspect(), new Aspect(), new Aspect(), new Aspect()];
  health: number = 0;
  armor: number = 0;
  energy: number = 0;
  shield: number = 0;
  forcefield: number = 0;
  defense: number = 0;
  reaction: number = 0;
  initiative: number = 0;
  outbreak: number = 0;
  weakness: string = '';
  capacities: Capacity[] = [];
  weapons: Weapon[] = [];
  resilience: number = 0;

  constructor(base?: Npc) {
    if (base) {
      this.name = base.name;
      this.type = base.type;
      this.level = base.level;
      this.aspects = base.aspects.map(a => new Aspect(a));
      this.health = base.health;
      this.armor = base.armor;
      this.energy = base.energy;
      this.shield = base.shield;
      this.forcefield = base.forcefield;
      this.defense = base.defense;
      this.reaction = base.reaction;
      this.initiative = base.initiative;
      this.outbreak = base.outbreak;
      this.weakness = base.weakness
      this.capacities = base.capacities.map(c => new Capacity(c));
      this.weapons = base.weapons.map(w => new Weapon(w));
      this.resilience = base.resilience;
    } else {
      for (let i = 0; i < 5; ++i) {
        this.aspects[i].name = ASPECTS_LABELS[i];
      }
    }
  }

  elite() {
    const npc = new Npc(this);

    npc.name += ' (élite)';

    return npc;
  }

  addWeapon() {
    this.weapons.push(new Weapon());
  }

  addCapacity() {
    this.capacities.push(new Capacity());
  }

  removeWeapon(weapon: Weapon) {
    this.weapons = this.weapons.filter(w => w !== weapon);
  }

  removeCapacity(capacity: Capacity) {
    this.capacities = this.capacities.filter(c => c !== capacity);
  }

}

export interface NpcGrid {
  aspects: { min: number; max: number; limit: number; };
  aspects_exceptionals: { min: number; max: number; limit: number; major_min: number; major_max: number };
  health: { min: number; max: number; };
  armor: { min: number; max: number; };
  forcefield: { min: number; max: number; };
  shield: { min: number; max: number; };
  energy: { min: number; max: number; };
  resilience: number;
  capacities: number;
  outbreak: { min: number; max: number; effects_min: number; effects_max: number };
}

export function grid(type: string, level: string) {
  return <NpcGrid> (<any> GRID)[type][level];
}