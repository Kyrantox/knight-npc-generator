import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
  opened: boolean = false;
  json: string = '';

  ngOnInit(): void {
  }

  open(data: any) {
    document.body.classList.add('no-scroll');

    this.json = JSON.stringify(data);
    this.opened = true;
  }

  close(event: any) {
    if (event.target.id === 'export-background') {
      this.doClose();
    }
  }

  doClose() {
    if (this.opened) {
      this.opened = false;
      document.body.classList.remove('no-scroll');
    }
  }

}
