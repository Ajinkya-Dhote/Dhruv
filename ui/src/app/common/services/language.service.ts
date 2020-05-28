import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

    supportLangulage: string[] = ['en', 'hi', 'mr'];
    defaultLanguage: string = 'en';

    constructor(private translate: TranslateService) {
        translate.addLangs(this.supportLangulage);
        translate.setDefaultLang(this.defaultLanguage);

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|hi|mr/) ? browserLang : 'en');
    }

    changeLanguage(lang) {
        if (this.supportLangulage.includes(lang)) {
          console.log("language change", lang);

            this.translate.use(lang);
        } else {
            // TODO: Added support for error service 
            console.error("Language not supported");

        }
    }
}
