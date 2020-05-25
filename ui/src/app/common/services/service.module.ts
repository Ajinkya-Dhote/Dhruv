import { NgModule, ModuleWithProviders } from '@angular/core';

import { MediaTypeService } from './media-type.service';

@NgModule({
    declarations: [],
    exports: [
  
    ]
  })
  export class ServiceModule {
      static forRoot(): ModuleWithProviders {
          return {
              ngModule: ServiceModule,
                  providers: [
                    MediaTypeService
                  ]
          };
        }
    }