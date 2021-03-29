import { Component, Input, OnInit } from '@angular/core';
import { BETE, CAPACITIES, CHAIR, DAME, EFFECTS, LOINTAINE, MACHINE, MASQUE } from '../constants';
import Capacity from '../model/Capacity';
import Effect from '../model/Effect';
import { Npc } from '../model/Npc';
import Weapon from '../model/Weapon';

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent implements OnInit {
  @Input() npc: Npc = new Npc();

  constructor() { }

  ngOnInit(): void { }

}
