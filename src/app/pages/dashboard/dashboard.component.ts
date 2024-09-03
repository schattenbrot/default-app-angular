import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteData } from 'app/app.routes';
import { AuthService } from 'app/auth/auth.service';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private auth: AuthService,
	) {}

	ngOnInit(): void {
		const routeData = this.route.snapshot.data as RouteData;
		console.log(routeData);

		this.auth.fetchAuthUser.subscribe();
	}
}
