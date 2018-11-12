import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
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

    @ViewChild(CalendarEventPopupComponent) private modal: CalendarEventPopupComponent;
    private eventsSnapshot: CalendarEvent<Appointment>[] = [];
    private searchCriteria: SearchCriteria;
    private tabsInitialized = false;

    public constructor(private readonly calendarService: CalendarService, private readonly route: ActivatedRoute, private readonly router: Router) {
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
    public dayClicked({date, events}: { date: Date; events: Array<CalendarEvent<Appointment>>; }): void {
        if(isSameMonth(date, this.viewDate)) {
            if((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0){
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }
    public eventClicked($event: CalendarEvent<Appointment>): void {
        if(!!this.modal && !!$event) {
            this.router.navigate(['dashboard', $event.id]);
        }
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
    public _initTabs(events: CalendarEvent<Appointment>[]) { // UNSAFE: this might be initializing multiple tab instances, not sure;
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
        this.eventsSnapshot = events;

        const n = StateStore.getState('retryEventPopup');
        if(n !== null) {
            StateStore.putState({retryEventPopup: null});
            this.modal.open(events.find(e => e.id === +n));
        }
    }
    public ngAfterViewInit(): void {
         M.Sidenav.init(document.querySelectorAll('.sidenav'), {edge: 'right'});
    }
    public ngOnInit(): void {
        this.fetchEvents();
        this.route.paramMap.subscribe(map => {
            console.log('events snapshot:', this.eventsSnapshot);
            if(!!map.get('id')) {
                const event = this.eventsSnapshot.find(e => e.id === +map.get('id'));

                if(!event) StateStore.putState({retryEventPopup: +map.get('id')});
                else this.modal.open(event);
            }
        });
    }
}
