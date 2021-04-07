import { Component, Input, OnInit } from '@angular/core';
import { CHAIR, BETE, MACHINE, DAME, MASQUE, ASPECTS_LABELS } from '../constants';
import { GenerateOptions } from '../model/Npc';

@Component({
  selector: 'app-npc-generator',
  templateUrl: './npc-generator.component.html',
  styleUrls: ['./npc-generator.component.scss']
})
export class NpcGeneratorComponent implements OnInit {
  @Input() options: GenerateOptions = new GenerateOptions();
  aspects = [CHAIR, BETE, MACHINE, DAME, MASQUE].map(a => ASPECTS_LABELS[a]);

  constructor() { }

  ngOnInit(): void { }

}
