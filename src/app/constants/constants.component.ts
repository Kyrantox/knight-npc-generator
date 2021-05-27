import { Component, OnInit } from '@angular/core';
import { ALLIE, BANDE, HEROS, HOSTILE, INITIE, PATRON, PATRON_COLOSSE, RECRUE, SALOPARD } from '../constants';
import { effects as allEffects } from '../model/Effect';
import { grid, NpcGrid } from '../model/Npc';

@Component({
  selector: 'app-constants',
  templateUrl: './constants.component.html',
  styleUrls: ['./constants.component.scss']
})
export class ConstantsComponent implements OnInit {

  lines: { type: string; level: string; infos: NpcGrid }[] = [];
  effects = allEffects;

  constructor() {

    for (const type of [HOSTILE, SALOPARD, PATRON, PATRON_COLOSSE, BANDE, ALLIE]) {

      for (const level of [RECRUE, INITIE, HEROS]) {
        this.lines.push({ type, level, infos: grid(type, level) });
      }
    }
  }

  ngOnInit(): void {
  }

}
