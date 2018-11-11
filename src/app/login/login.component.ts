import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from "../_services/authentication.service";
import { LoginNeededRequest, StateStore } from '../_services/state-store.service';

@Component({
    styleUrls: ['login.component.scss'],
    templateUrl: 'login.component.html'
}) export class LoginComponent implements OnInit {
    public readonly loginRequest: LoginNeededRequest;

    public get f() { return this.loginForm.controls; }
    public loginForm: FormGroup;
    public loading = false;
    public submitted = false;

    private returnUrl: string;

    public constructor(private readonly authenticationService: AuthenticationService,
                       private readonly formBuilder: FormBuilder, private readonly route: ActivatedRoute,
                       private readonly router: Router) {
        this.loginRequest = StateStore.getState('loginIsNeeded');
    }

    public closeLoginMessage() {
        this.loginRequest.needLogin = false;
    }
    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    public onSubmit(): void {
        this.submitted = true;

        // stop here if form is invalid
        if(this.loginForm.invalid) return;

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    StateStore.putState({loginIsNeeded: {needLogin: false}});
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    M.toast({html: `${error}`});
                    this.loading = false;
                });
    }
}
