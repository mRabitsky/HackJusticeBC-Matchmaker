import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter } from "angular-calendar";
import {
    endOfDay,
    endOfMonth,
    endOfWeek,
    isAfter,
    isSameDay,
    isSameMonth,
    startOfDay,
    startOfMonth,
    startOfWeek
} from 'date-fns';
import { Observable } from 'rxjs';
import { Appointment } from '../_models/appointment';
import { CalendarService, SearchCriteria } from '../_services/calendar.service';
import { StateStore } from '../_services/state-store.service';
import { AbbreviatingDateFormatter } from './abbreviating-date-formatter';
import { CalendarEventPopupComponent } from './calendar-event-popup/calendar-event-popup.component';
import { EventTitleDateFormatter } from './event-title-date-formatter';

@Component({
    providers: [
        {
            provide: CalendarDateFormatter,
            useClass: AbbreviatingDateFormatter
        }, {
            provide: CalendarEventTitleFormatter,
            useClass: EventTitleDateFormatter
        }
    ],
    selector: 'dashboard',
    styleUrls: ['dashboard.component.scss'],
    templateUrl: 'dashboard.component.html'
}) export class DashboardComponent implements AfterViewInit, OnInit {
    public activeDayIsOpen: boolean = false;
    public events$: Observable<Array<CalendarEvent<Appointment>>>;
    public view: string = 'month';
    public viewDate: Date = new Date();

    @ViewChild(CalendarEventPopupComponent) private modal;
    private searchCriteria: SearchCriteria;
    private tabsInitialized = false;

    public constructor(private readonly calendarService: CalendarService) {
        this.searchCriteria = StateStore.getState('searchCriteria');
    }

    public canGoBackwards(): boolean {
        const today = new Date();
        return isAfter(this.viewDate, {
            month: endOfMonth(today),
            week: endOfWeek(today),
            day: endOfDay(today),
        }[this.view]);
    }
    public dayClicked({date, events}: { date: Date; events: Array<CalendarEvent<any>>; }): void {
        if(isSameMonth(date, this.viewDate)) {
            if((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0){
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }
    public eventClicked($event: CalendarEvent<any>): void {
        if(!!this.modal) this.modal.open($event);
    }
    public fetchEvents(): void {
        const start: Date = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        }[this.view];
        const end: Date = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        }[this.view];

        this.events$ = this.calendarService.getAvailableAppointments(start, end, this.searchCriteria);
    }
    public _initTabs() { // UNSAFE: this might be initializing multiple tab instances, not sure;
        if(!this.tabsInitialized) {
            M.Tabs.init(document.querySelector('.tabs'), { onShow: (el: Element) => this.view = el.id.split('View')[0] });
            this.tabsInitialized = true;
        } else {
            switch(this.view) {
            case 'month':
                $('#weekView, #dayView').css('display', 'none');
                break;
            case 'week':
                $('#monthView, #dayView').css('display', 'none');
                break;
            case 'day':
                $('#weekView, #monthView').css('display', 'none');
                break;
            }
        }
    }
    public ngAfterViewInit(): void {
         M.Sidenav.init(document.querySelectorAll('.sidenav'), {edge: 'right'});
    }
    public ngOnInit(): void {
        this.fetchEvents();
    }
}
