import { ARMORED, ASPECTS_LABELS, BANDE, BETE, COLOSSE, GRID, HEROS, HOSTILE, INITIE, MACHINE, MASQUE, ORGANIC, PATRON, PATRON_COLOSSE, RECRUE, ROBOT } from '../constants';
import Aspect from './Aspect';
import Capacity, { capacities } from './Capacity';
import Weapon from './Weapon';

function shuffle(a: any[]) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

export class GenerateOptions {
  power: number = 50;
  balances: number[] = [5, 5, 5, 5, 5];
  type: string = HOSTILE;
  level: string = RECRUE;
  subtype: string = ORGANIC;
  forcefield: boolean = false;
  resilience: boolean = false;
  energy: boolean = false;

  ratio(min: number, max: number) {
    return Math.round(min + (max - min) * (this.power * 0.01));
  }

  candidates(how: number) {
    return [0, 1, 2, 3, 4].sort((a, b) => this.balances[b] - this.balances[a]).slice(0, how);
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
  weakness: string = '';
  capacities: Capacity[] = [];
  weapons: Weapon[] = [];
  resilience: number = 0;
  color: string = '#d3181f';

  constructor(base?: Npc) {
    if (base) {
      this.copy(base);
    } else {
      for (let i = 0; i < 5; ++i) {
        this.aspects[i].id = i;
        this.aspects[i].name = ASPECTS_LABELS[i];
      }
    }
  }

  copy(npc: Npc) {
    this.name = npc.name;
    this.type = npc.type;
    this.level = npc.level;
    this.aspects = npc.aspects.map(a => new Aspect(a));
    this.health = npc.health;
    this.armor = npc.armor;
    this.energy = npc.energy;
    this.shield = npc.shield;
    this.forcefield = npc.forcefield;
    this.defense = npc.defense;
    this.reaction = npc.reaction;
    this.initiative = npc.initiative;
    this.outbreak = npc.outbreak;
    this.weakness = npc.weakness
    this.capacities = npc.capacities.map(c => new Capacity(c));
    this.weapons = npc.weapons.map(w => new Weapon(w));
    this.resilience = npc.resilience;
    this.color = npc.color;
  }

  generate(options: GenerateOptions) {
    this.copy(new Npc());

    this.type = options.type;
    this.level = options.level;

    const total = options.balances.reduce((previous, current) => current + previous, 0);
    const infos = grid(this.type, this.level);

    // Aspects
    const aspects = options.ratio(infos.aspects.min, infos.aspects.max);
    for (let i = 0; i < 5; ++i) {
      this.aspects[i].score = Math.max(1, Math.round(aspects * (options.balances[i] / total)));
    }

    let changed: boolean;
    do {
      changed = false;

      for (let i = 0; i < 5; ++i) {
        if (this.aspects[i].score > infos.aspects.limit) {
          const min = this.aspects.map(a => a.score).reduce((previous, current) => current < previous ? current : previous, Infinity);

          console.log('Increase', this.aspects.find(a => a.score === min));
          this.aspects.find(a => a.score === min)!.score += 1;
          console.log('Decrease', this.aspects[i]);
          this.aspects[i].score -= 1;

          changed = true;
        }
      }
    } while (changed);

    // Exceptional
    let exceptionals = options.ratio(infos.aspects_exceptionals.min, infos.aspects_exceptionals.max);
    for (const aspect of options.candidates(5)) {
      this.aspects[aspect].exceptional = Math.min(infos.aspects_exceptionals.limit, exceptionals);
      exceptionals -= this.aspects[aspect].exceptional;

      if (exceptionals <= 0) {
        break;
      }
    }

    // Major exceptional
    const majors = options.ratio(infos.aspects_exceptionals.major_min, infos.aspects_exceptionals.major_max);
    for (const aspect of options.candidates(majors)) {
      this.aspects[aspect].major = true;
    }

    // Others
    if (options.type === BANDE) {
      this.health = options.ratio(infos.health.min, infos.health.max);
      this.outbreak = options.ratio(infos.outbreak.min, infos.outbreak.max);
    } else {
      if (options.forcefield) {
        this.forcefield = options.ratio(infos.forcefield.min, infos.forcefield.max);
      } else {
        this.shield = options.ratio(infos.shield.min, infos.shield.max);
      }

      if (options.subtype === ORGANIC) {
        this.health =  options.ratio(infos.health.min, infos.health.max);
      } else if (options.subtype === ROBOT) {
        this.armor = options.ratio(infos.health.min, infos.health.max) + options.ratio(infos.armor.min, infos.armor.max);
      } else if (options.subtype === ARMORED) {
        this.health =  options.ratio(infos.health.min, infos.health.max);
        this.armor = options.ratio(infos.armor.min, infos.armor.max);
      }

      if (options.energy) {
        this.energy = options.ratio(infos.energy.min, infos.energy.max);
      }

      if (options.resilience) {
        this.resilience = Math.floor((this.health || this.armor) * infos.resilience);
      }
    }

    // Round
    this.health = Math.round(this.health / 10) * 10;
    this.armor = Math.round(this.armor / 10) * 10;
    this.energy = Math.round(this.energy / 10) * 10;
    this.resilience = Math.round(this.resilience / 10) * 10;

    // Computations
    this.defense = Math.floor(this.aspects[BETE].score / 2) + this.aspects[MASQUE].exceptional;
    this.reaction = Math.floor(this.aspects[MACHINE].score / 2) + this.aspects[MACHINE].exceptional;

    if (this.aspects[MASQUE].major) {
      this.initiative = 30;
    } else {
      this.initiative = Math.floor(this.aspects[MASQUE].score / 2) + this.aspects[MASQUE].exceptional;
    }

    let filteredCapacities = this.query(capacities);
    const weaknesses = [];
    shuffle(filteredCapacities);

    let counter = 0;
    for (const capacity of filteredCapacities) {
      if (this.hasCapacity(capacity)) {
        continue;
      }

      this.capacities.push(new Capacity(capacity));

      if (capacity.tags.includes('faiblesse (recrue)')) {
        weaknesses.push(RECRUE);
      } else if (capacity.tags.includes('faiblesse (initié)')) {
        weaknesses.push(INITIE);
      } else if (capacity.tags.includes('faiblesse (héros)')) {
        weaknesses.push(HEROS);
      }

      counter += 1;
      if (counter == infos.capacities) {
        break;
      }
    }

    for (const level of weaknesses) {
      filteredCapacities = this.query(capacities, { level, filterWeakness: true });
      shuffle(filteredCapacities);

      for (const capacity of filteredCapacities) {
        if (this.hasCapacity(capacity)) {
          continue;
        }

        this.capacities.push(new Capacity(capacity));

        break;
      }
    }

    if (this.type === BANDE) {
      filteredCapacities = this.query(capacities, { filterWeakness: true, effect: true });
      shuffle(filteredCapacities);

      // Keep only the first armor and forcefield effet
      let armor = false;
      let forcefield = false;
      filteredCapacities = filteredCapacities.filter(capacity => {
        const raw = capacity.raw();

        if (raw === 'Pénétrant' || raw === 'Ignore CdF') {
          if (forcefield) {
            return false;
          } else {
            forcefield = true;
          }
        }

        if (raw === 'Perce armure' || raw === 'Ignore armure') {
          if (armor) {
            return false;
          } else {
            armor = true;
          }
        }

        return true;
      });

      counter = 0;
      for (const capacity of filteredCapacities) {
        if (this.hasCapacity(capacity)) {
          continue;
        }

        this.capacities.push(new Capacity(capacity));

        counter += 1;
        if (counter === options.ratio(infos.outbreak.effects_min, infos.outbreak.effects_max)) {
          break;
        }
      }
    }
  }

  hasCapacity(capacity: Capacity) {
    return this.capacities.map(c => c.raw()).some(c => c === capacity.raw());
  }

  elite() {
    const info = grid(this.type, this.level);

    this.name += ' (élite)';

    const sortedAspects = [...this.aspects].sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      if ((a.exceptional > 0) !== (b.exceptional > 0)) {
        return a.exceptional ? -1 : +1;
      }

      if (a.major !== b.major) {
        return a.major ? -1 : +1;
      }

      return b.exceptional - a.exceptional;
    });

    for (const aspect of sortedAspects) {
      if ((aspect.score !== sortedAspects[0].score) || (aspect.major !== sortedAspects[0].major) || (aspect.exceptional !== sortedAspects[0].exceptional)) {
        break;
      }

      this.boost(aspect);
    }

    this.health = Math.floor(this.health * 1.5);
    this.armor = Math.floor(this.armor * 1.5);
    this.energy = Math.floor(this.energy * 1.5);
    this.forcefield = Math.floor(this.forcefield * 1.5);
    this.outbreak = Math.floor(this.outbreak * 1.5);
    this.resilience = Math.floor(this.resilience * 1.5);

    if (!this.forcefield) {
      this.shield = Math.max(10, Math.floor(this.shield * 1.5));
    }

    for (const weapon of this.weapons) {
      weapon.dices = Math.floor(weapon.dices * 1.5);
    }

    const boosted = new Set<Aspect>();

    let counter = 0;
    for (const aspect of sortedAspects) {
      if (aspect.exceptional && !aspect.major) {
        this.boostMajor(aspect);

        boosted.add(aspect)

        counter += 1;
        if (counter >= info.elite.major_aspects) {
          break;
        }
      }
    }

    if (counter < info.elite.major_aspects) {
      for (const aspect of sortedAspects) {
        if (boosted.has(aspect)) {
          continue;
        }

        if (aspect.exceptional) {
          this.boostMajor(aspect);

          counter += 1;
          if (counter >= info.elite.major_aspects) {
            break;
          }
        }
      }
    }

    const fixedCapacities = this.query(['Anathème', 'Domination', 'Actions multiples (1)', 'Peur (1)', 'Charge brutale', 'Indestructible', 'Régénération', 'Protéiforme (mineur)']
      .map(data => capacities.find(c => c.name === data)!));

    if (fixedCapacities.length && !this.capacities.some(c => fixedCapacities.map(e => e.raw()).includes(c.raw()))) {
      this.capacities.push(new Capacity(fixedCapacities[Math.floor(Math.random() * fixedCapacities.length)]));
    }

    for (const capacity of this.capacities) {
      if (capacity.raw() === 'Actions multiples') {
        if (capacity.name === 'Actions multiples (1)') {
          capacity.copy(capacities.find(c => c.name === 'Actions multiples (2)')!);
        } else if (capacity.name === 'Actions multiples (2)') {
          capacity.copy(capacities.find(c => c.name === 'Actions multiples (3)')!);
        } else if (capacity.name === 'Actions multiples (3)') {
          capacity.copy(capacities.find(c => c.name === 'Actions multiples (4)')!);
        } else if (capacity.name === 'Actions multiples (4)') {
          capacity.copy(capacities.find(c => c.name === 'Actions multiples (5 ou plus)')!);
        }
      }
    }

    const filteredCapacities = this.query(capacities, { elite: true });

    shuffle(filteredCapacities);
    counter = 0;
    for (const capacity of filteredCapacities) {
      if (this.hasCapacity(capacity)) {
        continue;
      }

      this.capacities.push(new Capacity(capacity));

      counter += 1;
      if (counter === info.elite.capacities) {
        break;
      }
    }
  }

  query(capacities: Capacity[], options: { elite?: boolean, level?: string, filterWeakness?: boolean, effect?: boolean } = {}) {
    const types: string[] = [];

    if (this.type !== PATRON_COLOSSE) {
      types.push(this.type);
    } else {
      types.push(PATRON, COLOSSE);
    }

    const levels: string[] = [];
    const level = options.level ?? this.level;

    if (level === RECRUE) {
      levels.push(RECRUE);
    } else if (level === INITIE) {
      levels.push(RECRUE, INITIE);
    } else if (level === HEROS) {
      levels.push(RECRUE, INITIE, HEROS);
    }

    const excluded = ['autre'];
    const required: string[] = [];

    if (options.elite) {
      required.push('élite');
    } else {
      excluded.push('élite');
    }

    if (options.filterWeakness) {
      excluded.push('faiblesse (recrue)', 'faiblesse (initié)', 'faiblesse (héros)');
    }

    if (options.effect) {
      required.push('effet');
    } else {
      excluded.push('effet');
    }

    return capacities.filter(c =>
      required.every(tag => c.tags.includes(tag)) &&
      excluded.every(tag => !c.tags.includes(tag)) &&
      types.some(tag => c.tags.includes(tag)) &&
      levels.some(tag => c.tags.includes(tag))
    );
  }

  boost(aspect: Aspect) {
    let boost = Math.floor(aspect.score * 0.5);

    if (aspect.score + boost > 20) {
      boost -= aspect.score + boost - 20;
    }

    aspect.score += boost;

    if (aspect.id === BETE) {
      this.defense += Math.floor(boost * 0.5);

      if (aspect.exceptional && aspect.major) {
        for (const weapon of this.weapons) {
          if (weapon.contact) {
            weapon.raw += boost;
          }
        }
      }
    } else if (aspect.id === MACHINE) {
      this.reaction += Math.floor(boost * 0.5);
    } else if (aspect.id === MASQUE) {
      this.initiative += Math.floor(boost * 0.5);
    }
  }

  boostMajor(aspect: Aspect) {
    const toMajor = !aspect.major;
    aspect.major = true;

    let boost = Math.floor(aspect.exceptional * 0.5);

    if (aspect.exceptional + boost > 10) {
      boost -= aspect.exceptional + boost - 10;
    }

    aspect.exceptional += boost;

    if (aspect.id === BETE) {
      for (const weapon of this.weapons) {
        if (weapon.contact) {
          weapon.raw += boost;

          if (toMajor) {
            weapon.raw += aspect.score;
          }
        }
      }
    } else if (aspect.id === MACHINE) {
      this.reaction += boost;
    } else if (aspect.id === MASQUE) {
      this.initiative = 30;
      this.defense += boost;
    }
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
  elite: { major_aspects: number; capacities: number }
}

export function grid(type: string, level: string) {
  return <NpcGrid> (<any> GRID)[type][level];
}