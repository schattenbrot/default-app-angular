import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { AuthUser } from './auth/auth.service';
import { noAuthGuard } from './auth/no-auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { authUserResolver } from './resolvers/auth-user.resolver';

export type RouteData = {
	authUser?: AuthUser;
};

export const routes: Routes = [
	// Always
	{
		path: '',
		component: HomeComponent,
	},

	// Only without auth
	{
		path: '',
		canActivate: [noAuthGuard],
		children: [
			{
				path: 'login',
				component: AuthComponent,
			},
			{
				path: 'register',
				component: AuthComponent,
			},
		],
	},

	// Only with auth
	{
		path: '',
		canActivate: [authGuard],
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
				resolve: {
					authUser: authUserResolver,
				},
			},
		],
	},
];
