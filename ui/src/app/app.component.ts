import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaTypeService } from  '@services/media-type.service';
import { DeviceType } from '@models/DeviceType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  deviceType: DeviceType;

  constructor(private media: MediaTypeService) {}

  ngOnInit() {
    this.media.type.subscribe(type => this.deviceType = type);
  }

  ngOnDestroy() {
   
  }
}
