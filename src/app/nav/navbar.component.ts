import {Component} from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: 'navbar',
  template:
    `<mz-navbar class="navbar navbar-fixed z-depth-0">
      <a href="#" class="brand-logo">Logo</a>
      <mz-navbar-item-container [align]="'right'">
        <mz-navbar-item><a href="#mission">Our Mission</a></mz-navbar-item>
        <mz-navbar-item><a href="#about">About</a></mz-navbar-item>
        <mz-navbar-item><a href="#contact">Contact</a></mz-navbar-item>
      </mz-navbar-item-container>
    </mz-navbar>`
}) export class NavbarComponent {
  public constructor() {
    $(document).scroll(function(e) {
      const nav = $('nav');

      if($(document).scrollTop() === 0) {
        nav.removeClass('z-depth-3');
        nav.removeClass('scrolled');
        nav.addClass('z-depth-0');
      } else if(!$(nav).hasClass('z-depth-3')) {
        nav.removeClass('z-depth-0');
        nav.addClass('z-depth-3');
        nav.addClass('scrolled');
      }
    })
  }

  public ngAfterViewInit(): void {
    $('nav').addClass('z-depth-0');
  }
}
