import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class NavTracerService {
  private static readonly BREAD_CRUMB = 'breadCrumb';
  private routeBroadcaster: BehaviorSubject<string> = new BehaviorSubject<string>('');
  routeReceiver = this.routeBroadcaster.asObservable();
  private separator;
  constructor (private titleService: Title, private router: Router) { }

  setTitle(
    routes: ActivatedRoute,
    appName: string,
    separator1: string = ':',
    separator2: string = '>'
  ) {
    this.separator = separator2;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res) => {
        let navTrace = this.generateNavTrace(routes);
        if (!isNullOrUndefined(navTrace) || navTrace !== '') {
          navTrace = appName + separator1 + navTrace;
        } else {
          navTrace = appName;
        }

        this.titleService.setTitle(navTrace);
      });
  }

  generateNavTrace(routes: ActivatedRoute, navTrace: string = ''): string {
    let childrens = routes.children;
    if (childrens.length == 0) {
      return navTrace;
    }

    for (let child of childrens) {
      let navName = child.snapshot.data[NavTracerService.BREAD_CRUMB];

      if (!isNullOrUndefined(navName)) {
        navTrace +=
          navTrace == ''
            ? navName == ''
              ? ''
              : navName
            : navName == ''
              ? navName
              : this.separator + navName;
      }

      return this.generateNavTrace(child, navTrace);
    }
  }

  activatedRouteBroadCaster() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(res => {
      let urlTree: UrlTree = this.router.parseUrl(this.router.url);
      let segmentGroup: UrlSegmentGroup = urlTree.root.children[PRIMARY_OUTLET];
      let urlSegments: UrlSegment[] = segmentGroup.segments;
      this.routeBroadcaster.next(urlSegments[0].path);
    });
  }
}
