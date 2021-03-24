import CAPACITIES from './capacity';
import EFFECTS from './effect';
import GRID from './grid';
import { HOSTILE, Npc, RECRUE } from './Npc';

export class GenerateOptions {
  name: string = '';
  type: string = HOSTILE;
  level: string = RECRUE;
  other: boolean = false;
  power: number = 0.5;
  balances: number[] = [5, 5, 5, 5, 5];
}

export default class Generator {

  generate(options: GenerateOptions) {
    const npc = new Npc();

    npc.name = options.name;
    npc.type = options.type;
    npc.level = options.level;

    const total = options.balances.reduce((previous, current) => current + previous, 0);
    const infos = GRID[options.type][options.level];

    // Aspects
    const aspects = infos.aspects.min + Math.round((infos.aspects.max - infos.aspects.min) * options.power);
    for (let i = 0; i < 5; ++i) {
      npc.aspects[i].score = Math.max(1, Math.round(aspects * (options.balances[i] / total)));
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
    // const exceptionals = infos.aspects_exceptionals.min + Math.round((infos.aspects_exceptionals.max - infos.aspects_exceptionals.min) * options.power);
    // for (let i = 0; i < 5; ++i) {

    // }


    return npc;
  }

  elite(base: Npc) {
    const npc = new Npc(base);

    npc.name += ' (élite)';

    return base;
  }

}