import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";
import * as $ from "jquery";
declare const M: any;

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'navbar',
  styleUrls: ['navbar.component.scss'],
  template:`
    <nav class="z-depth-0">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">SeekLegal</a>
        <a href="#" data-target="mobile-sidenav" class="right sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li data-target="#about"><a href="#about">About</a></li>
          <li data-target="#how-it-works"><a href="#how-it-works">How This Works</a></li>
          <li data-target="#mission"><a href="#mission">Our Mission</a></li>
          <li data-target="#contact"><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-sidenav">
      <li data-target="#about"><a class="sidenav-close" href="#about">About</a></li>
      <li data-target="#how-it-works"><a class="sidenav-close" href="#how-it-works">How This Works</a></li>
      <li data-target="#mission"><a class="sidenav-close" href="#mission">Our Mission</a></li>
      <li data-target="#contact"><a class="sidenav-close" href="#contact">Contact</a></li>
    </ul>
    `
}) export class NavbarComponent implements AfterViewInit {
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
        M.Sidenav.init(document.querySelector('.sidenav'), {edge: 'right', draggable: true});
    }
}
