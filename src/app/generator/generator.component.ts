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
  toElite: boolean = false;
  list: Npc[] = [];

  constructor() {
    const json = localStorage.getItem('list');

    if (json) {
      const data = JSON.parse(json);
      this.list = data.map((e: any) => new Npc(e));
    }
  }

  ngOnInit(): void { }

  convertToElite() {
    this.toElite = true;
    this.elite = this.npc.elite();
  }

  load(npc: Npc) {
    this.npc = npc;
    this.toElite = false;
  }

  save(npc: Npc) {
    if (!npc.name) {
      return;
    }

    this.list.push(npc);
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  delete(npc: Npc) {
    this.list = this.list.filter(e => e !== npc);
    localStorage.setItem('list', JSON.stringify(this.list));
  }

}
