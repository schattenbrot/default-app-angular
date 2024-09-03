import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment as env } from 'src/environments/environment';

export type AuthUser = { id: string; email: string; roles: string[] };

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	accessToken = '';
	private authUser = new BehaviorSubject<AuthUser | null>(null);

	constructor(private http: HttpClient) {}

	get authUser$() {
		return this.authUser.asObservable();
	}

	get fetchAuthUser() {
		return this.http
			.get<AuthUser | null>(`${env.apiUrl}/api/auth/self`)
			.pipe(tap(user => this.authUser.next(user)));
	}

	login(email: string, password: string) {
		return this.http
			.post<{
				accessToken: string;
				user: AuthUser;
			}>(`${env.apiUrl}/api/auth/login`, {
				email,
				password,
			})
			.pipe(
				tap(({ accessToken, user }) => {
					this.accessToken = accessToken;
					this.authUser.next(user);
				}),
			);
	}

	register(email: string, password: string) {
		return this.http.post(`${env.apiUrl}/api/auth/register`, {
			email,
			password,
		});
	}

	refreshAccessToken() {
		return this.http
			.get<{ accessToken: string }>(`${env.apiUrl}/api/auth/refresh-token`)
			.pipe(tap(({ accessToken }) => (this.accessToken = accessToken)));
	}
}
