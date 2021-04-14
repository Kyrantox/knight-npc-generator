import { Component, OnInit } from '@angular/core';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  opened: boolean = false;
  json: string = '';
  npc: Npc = new Npc();


  ngOnInit(): void {}

  open(npc: Npc) {
    document.body.classList.add('no-scroll');

    this.npc = npc;
    this.json = '';
    this.opened = true;
  }

  import() {
    this.npc.import(JSON.parse(this.json));

    this.doClose();
  }

  close(event: any) {
    if (event.target.id === 'import-background') {
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
