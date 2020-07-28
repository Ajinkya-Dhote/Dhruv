import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    private _observer: Observer<boolean>;
    loader$: Observable<any>;

    constructor() {
        this.loader$ = new Observable(observe => this._observer = observe).pipe(share());
    }



    show() {
        this._observer && this._observer.next(true);
    }

    hide() {
        this._observer && this._observer.next(false);
    }
}
