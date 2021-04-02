import { ASPECTS_LABELS, BETE, CHAIR, GRID, HEROS, HOSTILE, INITIE, MACHINE, MASQUE, RECRUE } from '../constants';
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
      this.color = base.color;
    } else {
      for (let i = 0; i < 5; ++i) {
        this.aspects[i].id = i;
        this.aspects[i].name = ASPECTS_LABELS[i];
      }
    }
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

    const fixedCapacities = ['Anathème', 'Domination', 'Actions multiples (1)', 'Peur (1)', 'Charge brutale', 'Indestructible', 'Régénération', 'Protéiforme (mineur)']
      .map(data => capacities.find(c => c.name === data)!);

    if (!this.capacities.some(c => fixedCapacities.map(e => e.raw()).includes(c.raw()))) {
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

    const query = this.query();
    query.required.push('élite');

    const filteredCapacities = capacities.filter(c =>
      query.required.every(tag => c.tags.includes(tag)) &&
      query.excluded.every(tag => !c.tags.includes(tag)) &&
      query.one.some(tag => c.tags.includes(tag))
    );

    shuffle(filteredCapacities);
    for (let i = 0; i < info.elite.capacities && i < filteredCapacities.length; ++i) {
      this.capacities.push(new Capacity(filteredCapacities[i]));
    }
  }

  query() {
    const required: string[] = [];

    required.push(this.type);

    const excluded = ['autre'];

    const one: string[] = [];

    if (this.level === RECRUE) {
      one.push(RECRUE);
    } else if (this.level === INITIE) {
      one.push(RECRUE, INITIE);
    } else if (this.level === HEROS) {
      one.push(RECRUE, INITIE, HEROS);
    }

    return { required, excluded, one };
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