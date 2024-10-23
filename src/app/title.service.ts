import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('BDM DASHBOARD'); // Default title
  public title$ = this.titleSubject.asObservable();

  constructor(private router: Router) {
    // Listen to navigation events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.getActiveRoute();
      const title = route.snapshot.data['title'] || 'BDM DASHBOARD';
      this.titleSubject.next(title); // Update the title
    });
  }

  private getActiveRoute() {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
