import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
	],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
	isLoginForm: boolean = true; // Tracks whether the current form is login or registration
	authForm: FormGroup = new FormGroup({
		email: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
	});

	constructor(
		private router: Router,
		private auth: AuthService,
	) {}

	ngOnInit(): void {
		const currentUrl = this.router.url;
		if (currentUrl.includes('register')) {
			this.isLoginForm = false;
		}
	}

	toggleForm() {
		this.isLoginForm = !this.isLoginForm;
	}

	onSubmit() {
		if (this.authForm.invalid) {
			return;
		}
		const { email, password } = this.authForm.value;
		if (this.isLoginForm) {
			this.login(email, password);
		} else {
			this.register(email, password);
		}
	}

	login(email: string, password: string) {
		this.auth.login(email, password).subscribe({
			next: () => {
				this.router.navigate(['/dashboard']);
			},
			error: err => {
				console.error(err);
			},
		});
	}

	register(email: string, password: string) {
		this.auth.register(email, password).subscribe({
			next: () => {
				this.router.navigate(['/login']);
			},
			error: err => {
				console.error(err);
			},
		});
	}
}
