import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { config } from "../../config";
import { User } from '../_models/user';
import { StateStore } from './state-store.service';

@Injectable()
export class AuthenticationService {
    public constructor(private readonly http: HttpClient) {}

    public login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {username: username, password: password})
                   .pipe(map(user => {
                       // login successful if there's a jwt token in the response
                       if(user && user.token) {
                           // store user details and jwt token in local storage to keep user logged in between page refreshes
                           localStorage.setItem('currentUser', JSON.stringify(user));
                           StateStore.putState({currentUser: user});
                       }

                       return user;
                   }));
    }
    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        StateStore.putState({currentUser: null});
    }
}
