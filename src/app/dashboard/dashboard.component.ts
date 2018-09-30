import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {MzModalComponent} from "ngx-materialize";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
}) export class DashboardComponent implements AfterViewInit {
  @ViewChild(MzModalComponent) modal;

  public ngAfterViewInit() {
    this.modal.openModal();
  }
}
