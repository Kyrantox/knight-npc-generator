import { Capacity } from './capacity';
import { Effect } from './effect';

export const CHAIR = 0;
export const BETE = 1;
export const MACHINE = 2;
export const DAME = 3;
export const MASQUE = 4;
export const RECRUE = 'recrue';
export const INITIE = 'initié';
export const HEROS = 'héros';
export const HOSTILE = 'hostile';
export const SALOPARD = 'salopard';
export const PATRON = 'patron';
export const COLOSSE = 'colosse';
export const BANDE = 'bande';
export const PATRON_COLOSSE = 'patron colosse';
export const ALLIE = 'allié';
export const CONTACT = 'contact';
export const COURTE = 'courte';
export const MOYENNE = 'moyenne';
export const LONGUE = 'longue';
export const LOINTAINE = 'lointaine';

export class Aspect {
  score: number = 0;
  minor: number = 0;
  major: number = 0;

  constructor(base?: Aspect) {
    if (base) {
      this.score = base.score;
      this.minor = base.minor;
      this.major = base.major;
    }
  }
}

export class Weapon {
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
      this.effects = [...base.effects];
    }
  }
}

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