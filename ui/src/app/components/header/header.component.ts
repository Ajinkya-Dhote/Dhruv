import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '@environments/environment';

import { MediaTypeService } from  '@services/media-type.service';
import { LanguageService } from '@services/language.service';
import { LoaderService } from '@services/loader.service';
import { DeviceType } from '@models/DeviceType';

interface CITIES {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  title: string;

  cities: CITIES[] = [
    {value: 'Mumbai', viewValue: 'Mumbai'},
    {value: 'Nagpur', viewValue: 'Nagpur'},
    {value: 'Pune', viewValue: 'Pune'},
    {value: 'Hyderabad', viewValue: 'Hyderabad'}
  ];

  deviceType: DeviceType;
  promptEvent:any;
  isProgressBarVisible: boolean = false;


    constructor(private media: MediaTypeService,
                private language: LanguageService,
                private loader: LoaderService) {
      window.addEventListener('beforeinstallprompt', event => {
        this.promptEvent = event;
      });
    }

    ngOnInit() {
        this.title = environment.APP_NAME;
        this.media.type.subscribe(type => this.deviceType = type);
        this.loader.loader$.subscribe(isVisible => this.isProgressBarVisible = isVisible);
        });
    }

    ngOnDestroy() {
        this.media.type.unsubscribe();
        // this.loader.loader$.unsubscribe();
    }

    onLanguageSelect(lang) {
        this.language.changeLanguage(lang);
    }

    installPwa(): void {
      this.promptEvent.prompt();
    }

}
