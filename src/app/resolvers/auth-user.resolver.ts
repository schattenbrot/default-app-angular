import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService, AuthUser } from 'app/auth/auth.service';

export const authUserResolver: ResolveFn<AuthUser | null> = (
	_route,
	_state,
) => {
	const auth = inject(AuthService);

	return auth.authUser$;
};
