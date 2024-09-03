import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthService); // Inject AuthService using the new inject function
	const router = inject(Router);
	const platformId = inject(PLATFORM_ID);

	const authReq = req.clone({
		withCredentials: true, // Send cookies/credentials with the request
		setHeaders: {
			Authorization: `Bearer ${authService.accessToken}`, // Replace with your token retrieval logic
		},
	});

	// return next(authReq).pipe();
	return next(authReq).pipe(
		catchError((err: HttpErrorResponse) => {
			// Check if it's an authentication error
			if (err.status === 401 && isPlatformBrowser(platformId)) {
				return authService.refreshAccessToken().pipe(
					switchMap(({ accessToken }) => {
						const clonedAuthReq = req.clone({
							setHeaders: {
								Authorization: `Bearer ${accessToken}`,
							},
						});
						return next(clonedAuthReq).pipe(
							catchError((err: HttpErrorResponse) => {
								router.navigate(['/login']);
								return throwError(() => err);
							}),
						);
					}),

					catchError((err: HttpErrorResponse) => {
						router.navigate(['/login']);
						return throwError(() => err);
					}),
				);
			} else if (err.status === 401 && isPlatformServer(platformId)) {
				// Server can be savely ignored in this case
			}
			return throwError(() => err);
		}),
	);
};
