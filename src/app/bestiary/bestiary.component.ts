import { Component, OnInit } from '@angular/core';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-bestiary',
  templateUrl: './bestiary.component.html',
  styleUrls: ['./bestiary.component.scss']
})
export class BestiaryComponent implements OnInit {

  title: string = 'Meilleur bestiaire du monde';
  list: Npc[] = [];
  data: { npc: Npc; description: string }[] = [];
  bestiary: { npc: Npc; description: string }[] = [];

  constructor() {
    const json = localStorage.getItem('list');

    if (json) {
      const data = JSON.parse(json);
      this.list = data.map((e: any) => new Npc(e));

      this.generate();
    }
  }

  generate() {
    this.bestiary = this.list.map(npc => ({ npc, description: 'Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description Coucou je suis une super description '}));

    setTimeout(() => {
      const blocks = Array.from(document.querySelectorAll('#bestiary .npc-block-wrap'));

      for (const block of blocks) {
        (<any> block).style.height = (block.children[0].clientHeight * 0.7) + 'px';
      }
    }, 1);
  }

  ngOnInit(): void { }

}
