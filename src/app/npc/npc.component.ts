import { Component, Input, OnInit } from '@angular/core';
import { Npc } from '../model/Npc';

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