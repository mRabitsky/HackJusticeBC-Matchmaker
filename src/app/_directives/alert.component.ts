import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import {MzBaseModal, MzModalComponent, MzModalService} from "ngx-materialize";
import {AlertService} from "../_services/alert.service";

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html'
}) export class AlertComponent extends MzBaseModal implements OnInit, OnDestroy {
  @ViewChild(MzModalComponent) private modal;
  private subscription: Subscription;

  public buttons: string[] = [];
  public content: string;
  public options: Materialize.ModalOptions;
  public title: string;

  public constructor(private readonly alertService: AlertService) { super(); }

  public close(): void {
    if(!!this.modal) this.modal.closeModal();
  }
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  public ngOnInit() {
    this.subscription = this.alertService.getAlert().subscribe(alert => {
      if(!!alert && !!alert.content) {
        this.buttons = alert.buttons;
        this.content = alert.content;
        this.options = alert.options;
        this.title = alert.title;
        this.open();
      }
    });
  }
  public open(): void {
    if(!!this.modal) this.modal.openModal();
  }
}
