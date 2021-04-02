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

  properties: { property: keyof Npc, label: string  }[][] = [[
    { property: 'health', label: 'PS' },
    { property: 'defense', label: 'Défense' },
    { property: 'reaction', label: 'Réaction' },
    { property: 'shield', label: 'Bouclier' },
    { property: 'initiative', label: 'Initiative' }
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

  ngOnInit(): void { }

  effectChanged(val: string, effect: Effect) {
    effect.name = val;
  }

  effectSelected(item: Effect, effect: Effect) {
    effect.copy(item);
  }

  capacityChanged(val: string, capacity: Capacity) {
    capacity.name = val;
  }

  capacitySelected(item: Capacity, capacity: Capacity) {
    capacity.copy(item);
  }

}
