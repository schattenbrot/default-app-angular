import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
import { map } from 'rxjs/operators';

export const noAuthGuard: CanActivateFn = (_route, _state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.authUser$.pipe(
		map(user => {
			if (user) {
				router.navigate(['/dashboard']);
				return false;
			}
			return true;
		}),
	);
};
