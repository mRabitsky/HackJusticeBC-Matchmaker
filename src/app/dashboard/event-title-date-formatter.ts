import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';

export class EventTitleDateFormatter extends CalendarEventTitleFormatter {
    public constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
    }

    public month(event: CalendarEvent): string {
        return `<b>[${new DatePipe(this.locale).transform(
            event.start,
            'H:mm',
            this.locale
        )}]</b> ${event.title}`;
    }
}