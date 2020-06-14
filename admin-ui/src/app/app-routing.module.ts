import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '@components/login/login.component';
import { HomeComponent } from '@components/home/home.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { ProductsComponent } from '@components/products/products.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent,
          children: [
            {
              path: 'dashboard',
              component: DashboardComponent
            },
            {
              path: 'products',
              component: ProductsComponent
            }

          ]  
    },
    { path: '**', component: HomeComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
