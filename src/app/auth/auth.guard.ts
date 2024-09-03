import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (_route, _state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.authUser$.pipe(
		switchMap(user => {
			if (!user) {
				return authService.fetchAuthUser;
			}
			return of(user);
		}),
		map(user => {
			if (!user) {
				router.navigate(['/login']);
				return false;
			}
			return true;
		}),
	);
};
