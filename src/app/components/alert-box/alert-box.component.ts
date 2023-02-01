import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AlertBoxService } from 'src/app/service/alert-box-service/alert-box.service';


@Component({
	selector: 'app-alert-box',
	templateUrl: './alert-box.component.html',
	styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent implements OnInit {
	public alerts: Array<any> = this.alertBoxService.alerts;

	constructor(private alertBoxService: AlertBoxService) { }

	ngOnInit(): void {
	}

	newAlert(title: string, message: string) {
		this.alertBoxService.newAlert(title, message);
	}

	confirmAlert(i?: number) {
		this.alertBoxService.confirmAlert(i);
	}

	rejectAlert(i?: number) {
		this.alertBoxService.rejectAlert(i);
	}
}
