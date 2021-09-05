import { Component, OnInit } from '@angular/core';
import { CONTACT, WEAPON } from '../constants';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent implements OnInit {

  damage = WEAPON.damage[0];
  damageRaw = WEAPON.damageRaw[0];
  violence = WEAPON.violence[0];
  violenceRaw = WEAPON.violenceRaw[0];
  contact: boolean = true;
  cost: number = 0;
  effects: string[] = [];
  type: { name: string; cost: number, effects: string[] } = WEAPON.types[0];
  range = WEAPON.ranges.contact[0];
  effectsList: { name: string; list: { name: string; cost: number }[]; }[] = [];
  constants = WEAPON;

  constructor() {
    for (const infos of WEAPON.effects) {
      const [name, cost] = infos.split(' | ');

      const effect = this.effectsList.find(e => e.name === name);
      if (effect) {
        effect.list.push({ name, cost: Number(cost) });
      } else {
        this.effectsList.push({
          name,
          list: [{ name, cost: Number(cost) }]
        });
      }
    }
  }

  ngOnInit(): void {
  }

}
