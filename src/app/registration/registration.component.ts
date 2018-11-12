import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from "../_services/user.service";

@Component({
    styleUrls: ['registration.component.scss'],
    templateUrl: 'registration.component.html'
}) export class RegistrationComponent implements OnInit {
    public get f() { return this.registerForm.controls; }
    public loading = false;
    public registerForm: FormGroup;
    public submitted = false;

    public constructor(private readonly formBuilder: FormBuilder, private readonly router: Router, private readonly userService: UserService) {}

    public ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }
    public onSubmit(): void {
        console.log('submitting registration form');

        this.submitted = true;

        // stop here if form is invalid
        if(this.registerForm.invalid) {
            console.log('form is invalid, returning...');
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => this.router.navigate(['/login'], {queryParamsHandling: 'preserve'}),
                error => this.loading = false
            );
    }
}
