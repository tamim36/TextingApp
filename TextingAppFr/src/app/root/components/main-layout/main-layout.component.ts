import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavTracerService } from '@core/servcies/nav-tracer.service';
import { DomainService } from '@core/servcies/domain.service';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  BREAD_CRUMB_NAME: string = 'breadcrumb';
  constructor (
    private navTracer: NavTracerService,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.navTracer.setTitle(
      this.routes.root,
      DomainService.domains.AppName,
      '::'
    );
    this.navTracer.activatedRouteBroadCaster();
  }
}
