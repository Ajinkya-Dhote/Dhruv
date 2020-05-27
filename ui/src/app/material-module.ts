import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';

// import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';


@NgModule({
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatBottomSheetModule,
        MatSliderModule,
        FormsModule,
        ReactiveFormsModule,
        MatChipsModule
    ]
})

export class AppMaterialModule {}