import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '@components/home/home.component';
import { CheckoutComponent } from '@components/checkout/checkout.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
