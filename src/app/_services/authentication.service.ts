import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { config } from "../../config";
import { User } from '../_models/user';

@Injectable()
export class AuthenticationService {
    private currentUser: User | null = null;

    public constructor(private readonly http: HttpClient) {}

    public getCurrentUser(): User | null {
        return this.currentUser;
    }
    public login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {username: username, password: password})
                   .pipe(map(user => {
                       // login successful if there's a jwt token in the response
                       if(user && user.token) {
                           // store user details and jwt token in local storage to keep user logged in between page refreshes
                           localStorage.setItem('currentUser', JSON.stringify(user));
                           this.currentUser = user;
                       }

                       return user;
                   }));
    }
    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
}
