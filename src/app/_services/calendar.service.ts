import { WeekDay } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../config';
import { Appointment } from '../_models/appointment';
import { AreaOfLaw, Jurisdiction, Specialization } from '../_models/legal-representative';
import { CalendarEvent } from 'angular-calendar';

@Injectable() export class CalendarService {
    public constructor(private readonly http: HttpClient) {}

    public getAvailableAppointments(dateRangeStart: Date, dateRangeEnd: Date, searchCriteria?: SearchCriteria): Observable<CalendarEvent<Appointment>[]> {
        return this.http.get<CalendarEvent<Appointment>[]>(`${config.apiUrl}/appointments`, {params: CalendarService._serialize(searchCriteria)});
    }

    private static _serialize(s: SearchCriteria): { [header: string] : string | string[] } {
        // rather than trying to do a fancy string encoding for the objects, I think it would be better to just flatten
        // each nested key into one large prefixed list of keys

        if(!s) return {};

        const result = {
            'areaOfLaw': s.areaOfLaw,
            'jurisdiction': s.jurisdiction,
            'remote': s.remote + ''
        };
        if(!!s.dailyAvailability) {
            result['hourlyAvailability'] = s.dailyAvailability.hourly;
            result['dailyAvailability'] = s.dailyAvailability.daily;
        }
        if(!!s.priceRange) {
            result['minPrice'] = s.priceRange.min || 0;
            result['maxPrice'] = s.priceRange.max;
        }
        if(!!s.specialization) result['specialization'] = s.specialization;

        return result;
    }
}

export interface SearchCriteria {
    remote: boolean;
    jurisdiction: Jurisdiction;
    specialization?: Specialization;
    areaOfLaw: AreaOfLaw;
    priceRange?: {
        min?: number;
        max: number;
    }
    dailyAvailability?: {
        hourly: {
            start: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
            end: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
        }[];
        daily: WeekDay[];
    }
}