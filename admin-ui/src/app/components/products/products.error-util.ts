import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Error {
    getNameError(control) {
         if (control.hasError('required')) {
                  return 'You must enter a name for product';
         }
    }

    getTypeError(control) {
         if (control.hasError('required')) {
            return 'You must select product type';
          }
    }

    getImageError(control) {
        if (control.hasError('required')) {
          return 'You must select image for product';
        }
    }

    getBaseQuantityError(control) {
        if (control.hasError('required')) {
          return 'You must select base quantity';
        }
    }

    getBaseQuantityUnitError(control) {
        if (control.hasError('required')) {
          return 'You must select base quantity unit';
        }
    }

    getBaseQuantityPriceError(control) {
        if (control.hasError('required')) {
          return 'You must select base quantity price';
        }
    }

    getMinQuantityError(control) {
        if (control.hasError('required')) {
          return 'You must select min quantity';
        }
    }

    getMaxQuantityError(control) {
        if (control.hasError('required')) {
          return 'You must select max quantity';
        }
    }
}
