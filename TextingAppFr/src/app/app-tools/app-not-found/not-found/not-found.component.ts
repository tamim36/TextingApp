import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from "@angular/common"

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  host:{class:'primary-background'}
})
export class NotFoundComponent{

  constructor(private router:Router,private location:Location) { }

  gotToHome() {
    this.router.navigate(['']);
  }

  goBack() {
    this.location.back();
  }

}
