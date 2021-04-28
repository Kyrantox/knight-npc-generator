import { Component, OnInit } from '@angular/core';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-mass-export',
  templateUrl: './mass-export.component.html',
  styleUrls: ['./mass-export.component.scss']
})
export class MassExportComponent implements OnInit {
  opened: boolean = false;
  list!: Npc[];
  json: string = '';
  selected!: boolean[];

  constructor() { }

  ngOnInit(): void {
  }

  open(list: Npc[]) {
    document.body.classList.add('no-scroll');

    this.list = list;
    this.json = '';
    this.opened = true;
    this.selected = this.list.map(() => false);
  }

  generate() {
    const filtered = this.list.filter((npc, i) => this.selected[i]);

    if (!filtered.length) {
      return;
    }

    this.json = JSON.stringify(filtered.map(npc => npc.export()));

    setTimeout(() => document.getElementById('mass-export-background')!.scrollTo(0, document.getElementById('mass-export-content')!.getBoundingClientRect().height), 1);
  }

  close(event: any) {
    if (event.target.id === 'mass-export-background') {
      this.doClose()
    }
  }

  doClose() {
    if (this.opened) {
      this.opened = false;
      document.body.classList.remove('no-scroll');
    }
  }

}
