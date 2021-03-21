import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class TopNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
