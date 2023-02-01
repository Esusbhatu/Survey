import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title = 'InCompany';

	constructor(updates: SwUpdate) {
		updates.versionUpdates.subscribe(event => {
			if (event.type === "VERSION_DETECTED") {
				console.log("New version detected. Reloading...");
				updates.activateUpdate().then(() => document.location.reload());
				return;
			}
			console.log("No new version detected.");
		});
	}
}
