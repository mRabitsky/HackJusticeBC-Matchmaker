import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { SearchCriteria } from './calendar.service';

@Injectable() export class StateStore {
    private static readonly state: State = {
        currentUser: null,
        loginIsNeeded: { needLogin: false },
        searchCriteria: null
    };

    public static getState<K extends keyof State>(key: K): State[K] {
        return StateStore.state[key];
    }
    public static putState(newState: Partial<State>): void {
        Object.assign(StateStore.state, newState);
    }
}

export interface State {
    currentUser: User | null;
    loginIsNeeded: LoginNeededRequest; // state + message
    searchCriteria: SearchCriteria;
}
export interface LoginNeededRequest {
    needLogin: boolean;
    message?: string;
}