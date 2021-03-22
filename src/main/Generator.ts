import CAPACITIES from './capacity';
import EFFECTS from './effect';
import { HOSTILE, Npc, RECRUE } from './Npc';

class GenerateOptions {
  name: string = '';
  type: string = HOSTILE;
  level: string = RECRUE;
  other: boolean = false;
  power: number = 0.5;
}

export default class Generator {

  generate(options: GenerateOptions) {
    const npc = new Npc();

    npc.name = options.name;
    npc.type = options.type;
    npc.level = options.level;

    return npc;
  }

  elite(base: Npc) {
    const npc = new Npc(base);

    npc.name += ' (élite)';

    return base;
  }

}