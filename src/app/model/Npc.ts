import { HOSTILE, RECRUE } from '../constants';
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
  weakness: string[] = [];
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
      this.weakness = [...base.weakness];
      this.capacities = [...base.capacities];
      this.weapons = base.weapons.map(w => new Weapon(w));
      this.resilience = base.resilience;
    }
  }

}