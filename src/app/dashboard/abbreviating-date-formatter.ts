import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';

export class AbbreviatingDateFormatter extends CalendarDateFormatter {
    public dayViewHour({ date, locale }: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'HH:mm', locale);
    }
    public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'EEE', locale);
    }
    public monthViewTitle({ date, locale }: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'MMM y', locale);
    }
    public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
        return new DatePipe(locale).transform(date, 'EEE', locale);
    }
}