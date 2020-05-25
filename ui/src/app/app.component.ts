import { Component, OnInit, OnDestroy } from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(private meddiaObserver: MediaObserver) {}

  ngOnInit() {
    this.mediaSub = this.meddiaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    })
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
