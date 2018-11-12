import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'main-app',
  styleUrls: ['main.component.scss'],
  templateUrl: 'main.component.html',
}) export class MainComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        M.ScrollSpy.init(document.querySelectorAll('.scrollspy'), {
            scrollOffset: 64,
            getActiveElement: (id: string) => `li[data-target="#${id}"]`
        });
    }
}
