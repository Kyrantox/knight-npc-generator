import { Component, Input, OnInit } from '@angular/core';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-npc-generator',
  templateUrl: './npc-generator.component.html',
  styleUrls: ['./npc-generator.component.scss']
})
export class NpcGeneratorComponent implements OnInit {
  @Input() npc: Npc = new Npc();

  constructor() { }

  ngOnInit(): void {
  }

}
