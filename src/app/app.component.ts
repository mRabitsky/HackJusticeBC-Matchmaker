import {Component, ViewEncapsulation} from '@angular/core';
import 'jquery';
import 'materialize-css';
declare var $: any;

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
}) export class AppComponent {}
