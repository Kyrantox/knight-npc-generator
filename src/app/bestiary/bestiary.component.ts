import { Component, OnChanges, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { colors, Npc } from '../model/Npc';
import { debounceTime } from 'rxjs/operators';
import { arrayDown, arrayUp, sortNpc } from '../util';

@Component({
  selector: 'app-bestiary',
  templateUrl: './bestiary.component.html',
  styleUrls: ['./bestiary.component.scss']
})
export class BestiaryComponent implements OnInit {
  title: string = '';
  list: Npc[] = [];
  data: { npc: Npc; description: string }[] = [];
  bestiary: { npc: Npc; description: string }[] = [];
  changed: Subject<void> = new Subject<void>();

  constructor() {
    let json = localStorage.getItem('list');
    if (json) {
      const data = JSON.parse(json);
      this.list = data.map((e: any) => new Npc(e));

      for (const npc of this.list) {
        if (!colors.includes(npc.color)) {
          colors.push(npc.color);
        }
      }

      sortNpc(this.list, colors);
    }

    json = localStorage.getItem('bestiary.cache');
    if (json) {
      const data = JSON.parse(json);

      this.title = data.title ?? '';
      this.data = data.data ?? [];
    }

    for (const line of this.data) {
      const npc = this.list.find(npc => npc.name === line.npc.name);

      if (npc) {
        line.npc = new Npc(npc);
      }
    }

    this.list = this.list.filter(npc => !this.data.some(line => line.npc.name === npc.name));

    this.changed.pipe(debounceTime(1000)).subscribe(() => {
      localStorage.setItem('bestiary.cache', JSON.stringify({ title: this.title, data: this.data }));
    });
  }

  add(npc: Npc) {
    this.list = this.list.filter(n => n !== npc);

    this.data.push({ npc, description: '' });

    this.change();
  }

  remove(line: { npc: Npc; description: string }) {
    this.data = this.data.filter(l => l !== line);

    this.list.push(line.npc);
    sortNpc(this.list, colors);

    this.change();
  }

  up(line: { npc: Npc; description: string }) {
    arrayUp(this.data, line);
    this.change();
  }

  down(line: { npc: Npc; description: string }) {
    arrayDown(this.data, line);
    this.change();
  }

  change() {
    this.changed.next();
  }

  generate() {
    this.bestiary = this.data.map(e => ({ npc: new Npc(e.npc), description: e.description }));

    if (!this.bestiary.length) {
      return;
    }

    setTimeout(() => {
      const blocks = Array.from(document.querySelectorAll('#bestiary .npc-block-wrap'));

      for (const block of blocks) {
        const style = (<any> block).style;
        style.height = (block.children[0].clientHeight * 0.7) + 'px';
        style.width = (block.children[0].clientWidth * 0.7) + 'px';
      }

      // Fix summary page first
      const summaryPage = document.querySelector('.npc-summary .page-content')!;

      if (summaryPage.children[0].clientHeight + 20 > summaryPage.clientHeight) {
        const summary = summaryPage.querySelector('.summary-list')!;

        if (summary) {
          const diff = summaryPage.children[0].clientHeight + 20 - summaryPage.clientHeight;
          (<any> summary).style.height = (summary.clientHeight - diff) + 'px';
        }
      }

      const pages = Array.from(document.querySelectorAll('.page-content'));

      for (const page of pages) {
        if (page.children[0].clientHeight + 20 > page.clientHeight) {
          page.querySelector('.page-npc-content')!.classList.add('two-columns');
        }
      }

      for (const page of pages) {
        if (page.children[0].clientHeight + 20 > page.clientHeight) {
          const npc = page.querySelector('.npc-block-wrap');

          if (npc) {
            const diff = page.children[0].clientHeight + 20 - page.clientHeight;

            const ratio = diff / npc.clientHeight;

            const style = (<any> npc).style;
            style['margin-left'] = -(npc.clientWidth * ratio) + 'px';
            style.transform = `scale(${1 - ratio})`;
          }
        }
      }

      setTimeout(() => window.scrollTo(0, document.getElementById('bestiary')!.getBoundingClientRect().top + window.scrollY - 50), 1);
    }, 1);
  }

  ngOnInit(): void { }

}
