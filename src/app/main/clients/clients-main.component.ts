import {AfterViewInit, Component} from "@angular/core";
import * as M from 'materialize-css';

@Component({
  selector: 'clients-landing-page',
  styleUrls: ['clients-main.component.scss'],
  templateUrl: 'clients-main.component.html'
}) export class ClientsMainComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    M.FormSelect.init(document.querySelectorAll('select'))
  }
}
