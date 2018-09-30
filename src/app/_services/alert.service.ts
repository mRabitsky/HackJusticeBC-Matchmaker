import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  public constructor(private readonly router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  public alert(title: string, content: string, buttons: string[], keepAfterNavigationChange = false, options?: Materialize.ModalOptions): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({
      title: title,
      content: content,
      buttons: buttons,
      options: options || {}
    });
  }

  public getAlert(): Observable<any> {
    return this.subject.asObservable();
  }
}
