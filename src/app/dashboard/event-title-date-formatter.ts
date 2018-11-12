import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { Appointment } from '../_models/appointment';

export class EventTitleDateFormatter extends CalendarEventTitleFormatter {
    public constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
    }

    public day(event: CalendarEvent<Appointment>): string {
        return this.week(event);
    }
    public week(event: CalendarEvent<Appointment>): string {
        const startTime: string = new DatePipe(this.locale).transform(event.start,'H:mm', this.locale);
        const minuteDiff: number = differenceInMinutes(event.end, event.start);
        const hourDiff: number = differenceInHours(event.end, event.start);
        const duration: string = (hourDiff ? hourDiff + 'hr' : '') + ((minuteDiff - 60 * hourDiff) > 0 ? (minuteDiff - 60 * hourDiff) + 'm' : '');
        const price: string = event.meta.price === 0
                              ? 'PRO BONO'
                              : (new CurrencyPipe(this.locale).transform(event.meta.price) + '/hr');

        return `<b>[${startTime}, ${duration}]<br/>[${price}]</b><br/>${event.title}`;
    }
    public month(event: CalendarEvent<Appointment>): string {
        const startTime: string = new DatePipe(this.locale).transform(event.start,'H:mm', this.locale);
        const minuteDiff: number = differenceInMinutes(event.end, event.start);
        const hourDiff: number = differenceInHours(event.end, event.start);
        const duration: string = (hourDiff ? hourDiff + 'hr' : '') + ((minuteDiff - 60 * hourDiff) > 0 ? (minuteDiff - 60 * hourDiff) + 'm' : '');
        const price: string = event.meta.price === 0
                                ? 'PRO BONO'
                                : (new CurrencyPipe(this.locale).transform(event.meta.price) + '/hr');

        return `<b>[${startTime}, ${duration}] [${price}]</b> ${event.title}`;
    }
}