import { Component, EventEmitter,  Input , Output } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent  {
  @Input()  showButton = false;
  @Output() removeSurvey = new EventEmitter<void>();
  
}
