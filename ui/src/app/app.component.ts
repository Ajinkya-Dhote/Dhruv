import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  askUserToUpdate: boolean = true;

  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      swUpdate.activateUpdate().then(() => document.location.reload());
    });

    
  }

 
  

  ngOnDestroy() {
   
  }
}
