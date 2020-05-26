import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

// import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';


@NgModule({
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule
        // MatNativeDateModule,
        // MatRippleModule
    ]
})

export class AppMaterialModule {}