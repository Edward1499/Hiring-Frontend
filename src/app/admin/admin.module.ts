import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from './pages/main/main.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminRoutingModule } from "./admin-routing.module";
import { CompetitionComponent } from './pages/competition/competition.component';
import { AddCompetitionComponent } from './components/add-competition/add-competition.component';
import { DepartmentComponent } from './pages/department/department.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { LanguageComponent } from './pages/language/language.component';
import { AddLanguageComponent } from './components/add-language/add-language.component';
import { PositionComponent } from './pages/position/position.component';
import { AddPositionComponent } from './pages/add-position/add-position.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CandidateDialogComponent } from './components/candidate-dialog/candidate-dialog.component';
import { HireComponent } from './pages/hire/hire.component';
import { EmployeeComponent } from './pages/employee/employee.component';

@NgModule({
    declarations: [
    MainComponent,
    CompetitionComponent,
    AddCompetitionComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    LanguageComponent,
    AddLanguageComponent,
    PositionComponent,
    AddPositionComponent,
    CandidateDialogComponent,
    HireComponent,
    EmployeeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
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
    MatNativeDateModule,
    MatPaginatorModule,
    AngularEditorModule,
    FormsModule
]
})
export class AdminModule { }