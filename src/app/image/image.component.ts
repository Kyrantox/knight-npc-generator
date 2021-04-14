import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  opened: boolean = false;

  ngOnInit(): void {}

  async open(id: string) {
    document.body.classList.add('no-scroll');

    const canvas = await html2canvas(<HTMLElement> document.getElementById(id)!.children[0], {
      scrollX: 0,
      scrollY: -window.scrollY
    });

    document.getElementById('image-canvas')!.innerHTML = '<img src="' + canvas.toDataURL() + '" />';

    this.opened = true;
  }

  close(event: any) {
    if (event.target.id === 'image-background') {
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
