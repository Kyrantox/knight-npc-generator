import { Component, OnInit } from '@angular/core';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  npc: Npc = new Npc();
  elite: Npc = new Npc();

  constructor() { }

  ngOnInit(): void {
  }

}
