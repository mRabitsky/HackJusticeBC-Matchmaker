import { Time } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { Appointment } from '../../_models/appointment';
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

    public bookThisAppointment(): void {}
    public ngAfterViewInit(): void {
        this.modal = M.Modal.init(document.querySelectorAll('.modal'), {
            onCloseEnd: (el: Element) => {
                $('calendar-event-popup').css('z-index', '-1');
                this.tooltip.destroy();
            },
            onOpenEnd: () => this.tooltip = M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
                html: `<div class="restrict-tooltip">This appointment is not in a physical location: it will be held remotely, such as through a phone call or over Skype.</div>`
            })[0]
        })[0];
    }
    public ngOnDestroy(): void {
        this.modal.destroy();
    }
    public open($event: CalendarEvent<Appointment>): void {
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