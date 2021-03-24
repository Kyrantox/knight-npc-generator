import CAPACITIES from './capacity';
import EFFECTS from './effect';
import GRID from './grid';
import { HOSTILE, Npc, RECRUE, BANDE, BETE, MASQUE, MACHINE } from './Npc';

export class GenerateOptions {
  name: string = '';
  type: string = HOSTILE;
  level: string = RECRUE;
  power: number = 0.5;
  balances: number[] = [5, 5, 5, 5, 5];
  forcefield: boolean = false;
  shield: boolean = true;
  armor: boolean = false;
  robot: boolean = false;
  energy: boolean = false;
  resilience: boolean = false;
}

export default class Generator {

  options: GenerateOptions;

  constructor(options: GenerateOptions) {
    this.options = options;
  }

  setOptions(options: GenerateOptions) {
    this.options = options;
  }

  ratio(min: number, max: number) {
    return Math.round(min + (max - min) * this.options.power);
  }

  candidates(how: number) {
    return [0, 1, 2, 3, 4].sort((a, b) => this.options.balances[b] - this.options.balances[a]).slice(0, how);
  }

  generate() {
    const npc = new Npc();

    npc.name = this.options.name;
    npc.type = this.options.type;
    npc.level = this.options.level;

    const total = this.options.balances.reduce((previous, current) => current + previous, 0);
    const infos = GRID[this.options.type][this.options.level];

    // Aspects
    const aspects = this.ratio(infos.aspects.min, infos.aspects.max);
    for (let i = 0; i < 5; ++i) {
      npc.aspects[i].score = Math.max(1, Math.round(aspects * (this.options.balances[i] / total)));
    }

    let changed: boolean;
    do {
      changed = false;

      for (let i = 0; i < 5; ++i) {
        if (npc.aspects[i].score > infos.aspects.limit) {
          const min = npc.aspects.map(a => a.score).reduce((previous, current) => current < previous ? current : previous, Infinity);

          npc.aspects.find(a => a.score === min)!.score += 1;
          npc.aspects[i].score -= 1;

          changed = true;
        }
      }
    } while (changed);

    // Exceptional
    let exceptionals = this.ratio(infos.aspects_exceptionals.min, infos.aspects_exceptionals.max);
    for (const aspect of this.candidates(5)) {
      npc.aspects[aspect].minor = Math.min(infos.aspects_exceptionals.limit, exceptionals);
      exceptionals -= npc.aspects[aspect].minor;

      if (exceptionals <= 0) {
        break;
      }
    }

    // Major exceptional
    const majors = this.ratio(infos.aspects_exceptionals.major_min, infos.aspects_exceptionals.major_max);
    for (const aspect of this.candidates(majors)) {
      npc.aspects[aspect].major = npc.aspects[aspect].minor;
    }

    // Others
    if (this.options.type === BANDE) {
      npc.health = this.ratio(infos.health.min, infos.health.max);
      npc.outbreak = this.ratio(infos.outbreak.min, infos.outbreak.max);
    } else {
      npc.health = this.ratio(infos.health.min, infos.health.max);

      if (this.options.forcefield) {
        npc.forcefield = this.ratio(infos.forcefield.min, infos.forcefield.max);
      }

      if (this.options.shield) {
        npc.shield = this.ratio(infos.shield.min, infos.shield.max);
      }

      if (this.options.armor) {
        npc.armor =  this.ratio(infos.armor.min, infos.armor.max);
      }

      if (this.options.robot) {
        npc.armor += npc.health;
        npc.health = 0;
      }

      if (this.options.energy) {
        npc.energy = this.ratio(infos.energy.min, infos.energy.max);
      }

      if (this.options.resilience) {
        npc.resilience = Math.floor((npc.health || npc.armor) * infos.resilience);
      }
    }

    // Computations
    npc.defense = Math.floor(npc.aspects[BETE].score / 2) + npc.aspects[MASQUE].minor;
    npc.reaction = Math.floor(npc.aspects[MACHINE].score / 2) + npc.aspects[MACHINE].minor;

    if (npc.aspects[MASQUE].major) {
      npc.initiative = 30;
    } else {
      npc.initiative = Math.floor(npc.aspects[MASQUE].score / 2) + npc.aspects[MASQUE].minor;
    }

    return npc;
  }

  elite(base: Npc) {
    const npc = new Npc(base);

    npc.name += ' (élite)';

    return base;
  }

}