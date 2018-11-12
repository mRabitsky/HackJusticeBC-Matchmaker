import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { addDays, addHours } from "date-fns";
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import { Appointment } from '../_models/appointment';
import { AreaOfLaw } from '../_models/legal-representative';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
    public constructor() {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if(request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.email === request.body.username && user.password === request.body.password;
                });

                if(filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        token: 'fake-jwt-token'
                    };

                    return of(new HttpResponse({status: 200, body: body}));
                } else {
                    // else return 400 bad request
                    return throwError({error: {message: 'email or password is incorrect'}});
                }
            }

            // get users
            if(request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if(request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({status: 200, body: users}));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({status: 401, error: {message: 'Unauthorised'}});
                }
            }

            // get user by id
            if(request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if(request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({status: 200, body: user}));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({status: 401, error: {message: 'Unauthorised'}});
                }
            }

            // register user
            if(request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body;

                // validation
                let duplicateUser = users.filter(user => { return user.email === newUser.email; }).length;
                if(duplicateUser) {
                    return throwError({
                        error: {
                            message: 'The email "'
                                     + newUser.email
                                     + '" is already in use by another account.'
                        }
                    });
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({status: 200}));
            }

            // delete user
            if(request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if(request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for(let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if(user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return of(new HttpResponse({status: 200}));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({status: 401, error: {message: 'Unauthorised'}});
                }
            }

            // get calendar events
            if(request.url.endsWith('/appointments') && request.method === 'GET') {
                const today = new Date();
                const events = [
                    {
                        id: 0,
                        start: today,
                        end: addHours(today, 4),
                        title: 'Event A',
                        color: {
                            primary: 'darkblue',
                            secondary: 'blue'
                        },
                        resizable: {
                            beforeStart: false,
                            afterEnd: false,
                        },
                        draggable: false,
                        meta: {
                            price: 20,
                            remote: true,
                            client: null,
                            lawyer: {
                                avatar: 'https://i.redd.it/4tlipwxnbtdz.jpg',
                                blurb: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cupiditate error reprehenderit sapiente tempore voluptatum. Aliquam cumque dignissimos dolorum est illum iure iusto, mollitia nobis quas quis saepe veritatis voluptates?',
                                practice: {
                                    specialization: 'lawyer',
                                    jurisdiction: ['ca_BC'],
                                    expertise: [AreaOfLaw.FAMILY]
                                },
                                id: 99,
                                name: 'Joe Schmoe',
                                ratings: {
                                    stars: [0, 0, 0, 2, 1],
                                    average: 4.33
                                }
                            }
                        }
                    } as CalendarEvent<Appointment>,
                    {
                        id: 1,
                        start: addHours(today, 10),
                        end: addHours(today, 12),
                        title: 'Event B',
                        color: {
                            primary: 'darkred',
                            secondary: 'red'
                        },
                        resizable: {
                            beforeStart: false,
                            afterEnd: false,
                        },
                        draggable: false,
                        meta: {
                            price: 45,
                            remote: false,
                            client: null,
                            lawyer: {
                                avatar: 'https://i.redd.it/4tlipwxnbtdz.jpg',
                                blurb: 'Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed. A yellow dressinggown, ungirdled, was sustained gently behind him on the mild morning air.',
                                practice: {
                                    specialization: 'lawyer',
                                    jurisdiction: ['ca_BC'],
                                    expertise: [AreaOfLaw.ENTERTAINMENT]
                                },
                                id: 45,
                                name: 'James Joyce',
                                ratings: {
                                    stars: [0, 0, 0, 1, 2],
                                    average: 4.66
                                }
                            }
                        }
                    } as CalendarEvent<Appointment>,
                    {
                        id: 2,
                        start: addDays(today, 2),
                        end: addHours(today, 56),
                        title: 'Event C',
                        color: {
                            primary: 'yellow',
                            secondary: 'cornsilk'
                        },
                        resizable: {
                            beforeStart: false,
                            afterEnd: false,
                        },
                        draggable: false,
                        meta: {
                            price: 0,
                            remote: true,
                            client: null,
                            lawyer: {
                                avatar: 'https://i.redd.it/4tlipwxnbtdz.jpg',
                                blurb: 'Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy lies a small unregarded yellow sun.',
                                practice: {
                                    specialization: 'lawyer',
                                    jurisdiction: ['ca_BC'],
                                    expertise: [AreaOfLaw.FAMILY]
                                },
                                id: 42,
                                name: 'Douglas Adams',
                                ratings: {
                                    stars: [0, 0, 0, 0, 4],
                                    average: 5
                                }
                            }
                        }
                    } as CalendarEvent,
                ];

                return of(new HttpResponse({status: 200, body: events}));
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export const mockBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: MockBackendInterceptor,
    multi: true
};
