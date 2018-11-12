import { Time } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { Appointment } from '../../_models/appointment';
import { StateStore } from '../../_services/state-store.service';
import Modal = M.Modal;
import Tooltip = M.Tooltip;

@Component({
    selector: 'calendar-event-popup',
    styleUrls: ['calendar-event-popup.component.scss'],
    templateUrl: 'calendar-event-popup.component.html'
}) export class CalendarEventPopupComponent implements AfterViewInit, OnDestroy {
    public calendarEvent: CalendarEvent<Appointment>;
    public duration: Time;

    private modal: Modal;
    private tooltip: Tooltip;

    public constructor(private readonly router: Router) {}

    public bookThisAppointment(): void {
        if(!!StateStore.getState('currentUser')) {
            this.router.navigate(['/']);
            M.toast({html: 'Booking has not been implemented yet.'});
        } else {
            StateStore.putState({ loginIsNeeded: {
                needLogin: true,
                message: "Before you can book an appointment, you'll need to log in so that we can know who you are!"
            }});
            this.router.navigate(['/login'], {queryParams: {returnUrl: `/dashboard/${this.calendarEvent.id}`}});
        }
    }
    public ngAfterViewInit(): void {
        this.modal = M.Modal.init(document.querySelectorAll('.modal'), {
            onCloseEnd: (el: Element) => {
                $('calendar-event-popup').css('z-index', '-1');
                this.router.navigate(['dashboard']);
            },
            onOpenEnd: () => this.tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
                html: `<div class="restrict-tooltip">This appointment is not in a physical location: it will be held remotely, such as through a phone call or over Skype.</div>`
            })[0],
        })[0];
    }
    public ngOnDestroy(): void {
        this.modal.destroy();
    }
    public open($event: CalendarEvent<Appointment>): void {
        if(!$event) return;

        this.calendarEvent = $event;
        const hourDiff = differenceInHours($event.start, $event.end);
        this.duration = {
            hours: hourDiff,
            minutes: differenceInMinutes($event.start, $event.end) - (hourDiff * 60),
        };

        $('calendar-event-popup').css('z-index', '1005');
        this.modal.open();
    }
}