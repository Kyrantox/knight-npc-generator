import { Component, Input, OnInit } from '@angular/core';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-npc-form',
  templateUrl: './npc-form.component.html',
  styleUrls: ['./npc-form.component.scss']
})
export class NpcFormComponent implements OnInit {
  @Input() npc: Npc = new Npc();

  constructor() { }

  ngOnInit(): void { }

}
