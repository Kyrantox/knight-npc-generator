import { Component, Input, OnInit } from '@angular/core';
import Capacity, { capacities } from '../model/Capacity';
import Effect, { effects } from '../model/Effect';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-npc-form',
  templateUrl: './npc-form.component.html',
  styleUrls: ['./npc-form.component.scss']
})
export class NpcFormComponent implements OnInit {
  @Input() npc: Npc = new Npc();

  properties: { property: keyof Npc, label: string, button?: () => void  }[][] = [[
    { property: 'health', label: 'PS' },
    { property: 'defense', label: 'Défense', button: () => this.npc.recomputeDefense() },
    { property: 'reaction', label: 'Réaction', button: () => this.npc.recomputeReaction() },
    { property: 'initiative', label: 'Initiative', button: () => this.npc.recomputeInitiative() },
    { property: 'shield', label: 'Bouclier' }
  ], [
    { property: 'resilience', label: 'Résilience' },
    { property: 'outbreak', label: 'Débordement' },
    { property: 'armor', label: 'Armure' },
    { property: 'forcefield', label: 'CdF' },
    { property: 'energy', label: 'Énergie' }
  ]];

  capacities = capacities;
  effects = effects;

  constructor() { }

  ngOnInit(): void {

  }

  changed(val: string, target: { name: string }) {
    target.name = val;
  }

  selected<T extends (Effect | Capacity)>(item: T, target: T) {
    target.copy(<any> item);
  }

  filter(items: (Effect | Capacity)[], query: string) {
    return items.filter(e => e.index.includes(query.toLowerCase()));
  }

}
