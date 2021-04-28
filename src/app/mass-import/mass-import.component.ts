import { Component, OnInit } from '@angular/core';
import { GeneratorComponent } from '../generator/generator.component';
import { Npc } from '../model/Npc';

@Component({
  selector: 'app-mass-import',
  templateUrl: './mass-import.component.html',
  styleUrls: ['./mass-import.component.scss']
})
export class MassImportComponent implements OnInit {
  opened: boolean = false;
  json: string = '';
  generator!: GeneratorComponent;
  strategy: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  open(generator: GeneratorComponent) {
    document.body.classList.add('no-scroll');

    this.generator = generator;
    this.json = '';
    this.opened = true;
  }

  import() {
    let data: any | undefined;

    try {
      data = JSON.parse(this.json);
    } catch (e) {
      console.log("Unable to parse JSON", e);
    }

    if (data) {
      if (!Array.isArray(data)) {
        data = [data];
      }

      data = data.map((e: any) => new Npc(e));

      this.generator.addNpc(this.strategy, data);
    }

    this.doClose();
  }

  close(event: any) {
    if (event.target.id === 'mass-import-background') {
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
