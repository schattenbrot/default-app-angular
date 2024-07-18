import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject,
	OnInit,
	PLATFORM_ID,
	ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
	RouterLink,
	RouterLinkActive,
	RouterOutlet,
	Routes,
} from '@angular/router';
import { routes } from 'app/app.routes';
import { Observable, map, shareReplay } from 'rxjs';
import { themeChange } from 'theme-change';

const SUN =
	'M12 15.5q1.45 0 2.475-1.025Q15.5 13.45 15.5 12q0-1.45-1.025-2.475Q13.45 8.5 12 8.5q-1.45 0-2.475 1.025Q8.5 10.55 8.5 12q0 1.45 1.025 2.475Q10.55 15.5 12 15.5Zm0 1.5q-2.075 0-3.537-1.463T7 12q0-2.075 1.463-3.537T12 7q2.075 0 3.537 1.463T17 12q0 2.075-1.463 3.537T12 17ZM1.75 12.75q-.325 0-.538-.213Q1 12.325 1 12q0-.325.212-.537Q1.425 11.25 1.75 11.25h2.5q.325 0 .537.213Q5 11.675 5 12q0 .325-.213.537-.213.213-.537.213Zm18 0q-.325 0-.538-.213Q19 12.325 19 12q0-.325.212-.537.212-.213.538-.213h2.5q.325 0 .538.213Q23 11.675 23 12q0 .325-.212.537-.212.213-.538.213ZM12 5q-.325 0-.537-.213Q11.25 4.575 11.25 4.25v-2.5q0-.325.213-.538Q11.675 1 12 1q.325 0 .537.212 .213.212 .213.538v2.5q0 .325-.213.537Q12.325 5 12 5Zm0 18q-.325 0-.537-.212-.213-.212-.213-.538v-2.5q0-.325.213-.538Q11.675 19 12 19q.325 0 .537.212 .213.212 .213.538v2.5q0 .325-.213.538Q12.325 23 12 23ZM6 7.05l-1.425-1.4q-.225-.225-.213-.537.013-.312.213-.537.225-.225.537-.225t.537.225L7.05 6q.2.225 .2.525 0 .3-.2.5-.2.225-.513.225-.312 0-.537-.2Zm12.35 12.375L16.95 18q-.2-.225-.2-.538t.225-.512q.2-.225.5-.225t.525.225l1.425 1.4q.225.225 .212.538-.012.313-.212.538-.225.225-.538.225t-.538-.225ZM16.95 7.05q-.225-.225-.225-.525 0-.3.225-.525l1.4-1.425q.225-.225.538-.213.313 .013.538 .213.225 .225.225 .537t-.225.537L18 7.05q-.2.2-.512.2-.312 0-.538-.2ZM4.575 19.425q-.225-.225-.225-.538t.225-.538L6 16.95q.225-.225.525-.225.3 0 .525.225 .225.225 .225.525 0 .3-.225.525l-1.4 1.425q-.225.225-.537.212-.312-.012-.537-.212ZM12 12Z';
const MOON = 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,
		RouterLinkActive,
		RouterOutlet,
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSlideToggleModule,
		MatListModule,
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, AfterViewInit {
	@ViewChild('darkModeSwitch', { read: ElementRef }) darkModeSwitch:
		| ElementRef
		| undefined;
	currentTheme: 'dark' | 'light' = 'dark';
	routes: Routes = routes.filter(route => route.data && route.data['title']);

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay(),
		);

	constructor(
		private breakpointObserver: BreakpointObserver,
		@Inject(PLATFORM_ID) private platformId: object,
	) {
		if (isPlatformBrowser(this.platformId)) {
			this.currentTheme = localStorage.getItem('theme') as 'dark' | 'light';
		}
	}

	ngOnInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			themeChange();
		}
		let aaaa = 'tT';
	}

	ngAfterViewInit() {
		if (this.darkModeSwitch) {
			this.darkModeSwitch.nativeElement
				.querySelector('.mdc-switch__icon--on')
				.firstChild.setAttribute('d', MOON);
			this.darkModeSwitch.nativeElement
				.querySelector('.mdc-switch__icon--off')
				.firstChild.setAttribute('d', SUN);
		}
	}

	navigateToGuide() {
		const link =
			'https://board.de.nostale.gameforge.com/index.php/Thread/14263-Schadensguide/';
		window.open(link, '_blank');
	}
}
