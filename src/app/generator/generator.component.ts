import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { GenerateOptions, Npc } from '../model/Npc';

declare var ClipboardItem: any;

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
  generator: boolean = false;
  options: GenerateOptions = new GenerateOptions();

  @ViewChild(ImageComponent) imageComponent!: ImageComponent;

  constructor() {
    const json = localStorage.getItem('list');

    if (json) {
      const data = JSON.parse(json);
      this.list = data.map((e: any) => new Npc(e));
    }
  }

  ngOnInit(): void { }

  generate() {
    this.npc.generate(this.options);
    this.toElite = false;
  }

  convertToElite() {
    this.toElite = true;
    this.elite = new Npc(this.npc);
    this.elite.elite();

    setTimeout(() => window.scrollTo(0, document.getElementById('elite')!.getBoundingClientRect().top + window.scrollY), 1);
  }

  load(npc: Npc) {
    this.npc = new Npc(npc);
    this.toElite = false;
    window.scrollTo(0, 0);
  }

  save(npc: Npc) {
    if (!npc.name) {
      return;
    }

    this.list = this.list.filter( e => e.name !== npc.name);
    this.list.push(new Npc(npc));

    this.list.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  delete(npc: Npc) {
    this.list = this.list.filter(e => e !== npc);
    localStorage.setItem('list', JSON.stringify(this.list));
  }

  async image(id: string) {
    this.imageComponent.open(id);
  }

}
