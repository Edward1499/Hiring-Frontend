import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from './pages/main/main.component';
import { ClientRoutingModule } from "./client-routing.module";
import { ProfileComponent } from './pages/profile/profile.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { LanguageDialogComponent } from './components/language-dialog/language-dialog.component';
import { ExpirienceDialogComponent } from './components/expirience-dialog/expirience-dialog.component';
import { TrainingDialogComponent } from './components/training-dialog/training-dialog.component';
import { PositionComponent } from './pages/position/position.component';
import { PositionDetailComponent } from './pages/position-detail/position-detail.component';


// import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
    MainComponent,
    ProfileComponent,
    LanguageDialogComponent,
    ExpirienceDialogComponent,
    TrainingDialogComponent,
    PositionComponent,
    PositionDetailComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ClientRoutingModule,
        MatChipsModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatIconModule,
        MatSelectModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class ClientModule { }