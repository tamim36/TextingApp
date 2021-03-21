import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-no-nav',
  templateUrl: './no-nav.component.html',
  styleUrls: ['./no-nav.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class NoNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
