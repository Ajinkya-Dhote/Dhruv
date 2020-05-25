import { Injectable } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, Subject } from 'rxjs';

import { DeviceType } from '@models/DeviceType';

@Injectable({
  providedIn: 'root'
})
export class MediaTypeService implements OnDestroy {

  mediaSub: Subscription;
  deviceType: DeviceType;

  type: Subject<DeviceType> =  new Subject();

  constructor(private meddiaObserver: MediaObserver) {     
    this.mediaSub = this.meddiaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias);
      switch (result.mqAlias) {
        case 'lg': {
          this.deviceType = DeviceType.lg;
          break;
        }
        case 'md': {
          this.deviceType = DeviceType.md;
          break;
        }
        case 'sm': {
          this.deviceType = DeviceType.sm;
          break;
        }
        case 'xs': {
          this.deviceType = DeviceType.xs;
          break;
        }
        default: {
          this.deviceType = DeviceType.sm;
        }
      }

      this.type.next(this.deviceType);
    });
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
