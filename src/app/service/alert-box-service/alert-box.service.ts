import { Injectable } from '@angular/core';
import { delay, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AlertBoxService {
	public alerts: Array<any> = [];
	private eventSubject$ = new Subject<string>();
	public confirmation$ = this.eventSubject$.asObservable();

	constructor() { }

	async newAlert(title: string, message: string, skipAlert: boolean = false) {
		if (skipAlert) {
			await delay(0);
			this.eventSubject$.next('confirmAlert');
		} else {
			this.alerts.push({ title: title, message: message });
		}
	}

	closeAlert(i?: number) {
		if (i) {
			this.alerts.splice(i, 1);
		} else {
			this.alerts.pop();
		}
	}

	confirmAlert(i?: number) {
		this.closeAlert(i);
		this.eventSubject$.next('confirmAlert');
	}

	rejectAlert(i?: number) {
		this.closeAlert();
		this.eventSubject$.next('rejectAlert');
	}
}
