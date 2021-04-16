import { Component, OnInit } from '@angular/core';
import * as printJS from 'print-js';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-bestiary',
  templateUrl: './bestiary.component.html',
  styleUrls: ['./bestiary.component.scss']
})
export class BestiaryComponent implements OnInit {

  list: Npc[] = [];

  constructor() {
    const json = localStorage.getItem('list');

    if (json) {
      const data = JSON.parse(json);
      this.list = data.map((e: any) => new Npc(e));
    }
  }

  ngOnInit(): void { }

  pdf() {
    printJS({
      printable: '#bestiary'
    });
  }

}
