import {C, COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith, switchMap, catchError} from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import {MatDialog} from '@angular/material/dialog';
import { LanguageDialogComponent } from '../../components/language-dialog/language-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ExpirienceDialogComponent } from '../../components/expirience-dialog/expirience-dialog.component';
import { TrainingDialogComponent } from '../../components/training-dialog/training-dialog.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import validateDominicanId from 'validacion-cedula-dominicana';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;

  departments: any[] = [];
  allCompetitions: any[] = [];
  competitions: any[] = [];

  allLanguages: any[] = [];

  allAcademicLevels: any[] = [];

  levels: any[] = [
    { id: 1, value: 'Basico' },
    { id: 2, value: 'Intermedio' },
    { id: 3, value: 'Avanzado' },
  ]

  candidate: any;

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  displayedLanguageColumns: string[] = ['name', 'level', 'action'];
  languageSource!: MatTableDataSource<any>;

  displayedExpirienceColumns: string[] = ['company', 'position', 'startDate', 'endDate', 'salary', 'action'];
  expirienceSource!: MatTableDataSource<any>;

  displayedTrainingColumns: string[] = ['description', 'academicLevel', 'startDate', 'endDate', 'institution', 'action'];
  trainingSource!: MatTableDataSource<any>;

  form: FormGroup = this.fb.group({
    personalId: [null, [Validators.required]],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    departmentId: [null, [Validators.required]],
    salary: [null, [Validators.required]],
    recomendedBy: [null],
  });

  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((competition: string | null) => (competition ? this._filter(competition) : this.allCompetitions.slice())),
    );
  }

  ngOnInit(): void {
    this.profileService.getDepartments()
      .pipe(
        map(data => {
          this.departments = data;
        }),
        switchMap(() => this.profileService.getCompetitions()),
        map(data => this.allCompetitions = data),
        switchMap(() => this.profileService.getLanguagesList()),
        map(data => this.allLanguages = data),
        switchMap(() => this.profileService.getAcademicLevels()),
        map(data => this.allAcademicLevels = data),
        switchMap(() => this.profileService.getCandidateByUserId(this.authService.getUserId)),
        map(data => {
          if (data) {
            this.candidate = data;
            this.loadCandidateData();
          }
        })
      )
      .subscribe();
  }

  loadCandidateData() {
    this.form.controls['personalId'].setValue(+this.candidate.personalId);
    this.form.controls['name'].setValue(this.candidate.name);
    this.form.controls['surname'].setValue(this.candidate.surname);
    this.form.controls['departmentId'].setValue(this.candidate.departmentId);
    this.form.controls['salary'].setValue(this.candidate.salary);
    this.form.controls['recomendedBy'].setValue(this.candidate.recomendedBy);

    this.competitions = this.candidate.competitions.map((x: any) => {
      return { id: x.competitionId, description: this.allCompetitions.find(c => c.id === x.competitionId).description }
    });

    this.languageSource = new MatTableDataSource(this.candidate.languages.map((x: any) => {      
      const obj = {
        language: {
          id: x.languageId,
          name: this.allLanguages.find(l => l.id === x.languageId)?.name
        },
        level: {
          id: x.level,
          value: this.levels[x.level - 1].value
        }
      };
      this.profileService.pushLanguage(obj);
      return obj;
    }));
    
    this.expirienceSource = new MatTableDataSource(this.candidate.expiriences.map((x: any) => {
      this.profileService.pushExpirience(x);
      return x;
    }));

    this.trainingSource = new MatTableDataSource(this.candidate.trainings.map((x: any) => {
      const obj = { 
        academicLevel: {
          id: x.academicLevelId,
          name: this.allAcademicLevels.find(a => a.id === x.academicLevelId).name
        }, 
        description: x.description, 
        startDate: x.startDate,
        endDate: x.endDate,
        institution: x.institution  
      };
      this.profileService.pushTraining(obj);
      return obj;
    }));
  }

  add(event: MatChipInputEvent): void {
    // const value = (event.value || {});

    // // Add our fruit
    // if (value) {
    //   this.competitions.push(value);
    // }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(competition: any): void {
    const index = this.competitions.findIndex(x => x.id === competition.id);

    if (index >= 0) {
      this.competitions.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.competitions.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCompetitions.filter(competition => competition.id.toLowerCase().includes(filterValue));
  }

  save(): void {
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario no valido!',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    };
    const a = this.form.controls['personalId'].value.toString();
    if (!validateDominicanId(a)) {
      Swal.fire({
        icon: 'error',
        title: 'Numero de cedula invalido',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    const request = {
      ...this.form.value,
      personalId: this.form.value.personalId.toString(),
      userId: this.authService.getUserId,
      competitions: this.competitions.map(x => ({ competitionId: x.id })),
      languages: this.languageSource?.data.map(x => ({ languageId: x.language.id, level: x.level.id })) || [],
      expiriences: this.expirienceSource?.data || [],
      trainings: this.trainingSource?.data.map(x => (
        { 
          academicLevelId: x.academicLevel.id, 
          description: x.description, 
          startDate: x.startDate,
          endDate: x.endDate,
          institution: x.institution  
        })) || []
    }
    this.profileService.clearState();
    if (this.candidate) {
      this.profileService.updateCandidate(this.candidate.id, request)
      .pipe(
        map((data) => {
          Swal.fire({
            icon: 'success',
            title: 'Operacion realizada satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.candidate = data;
          this.loadCandidateData();
        }),
        catchError((err, caught) => (Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error en el servidor, por favor intente mas tarde',
          showConfirmButton: true,
        })))
      )
      .subscribe();
    } else {
      this.profileService.createCandidate(request)
      .subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Operacion realizada satisfactoriamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.candidate = data;
        this.loadCandidateData();
      });
    }
  }

  openDialog(): void {
    this.dialog.open(LanguageDialogComponent, {
      width: '350px',
      //enterAnimationDuration,
      //exitAnimationDuration,
    })
    .afterClosed()
    .subscribe(() => {
      this.languageSource = new MatTableDataSource(this.profileService.getLanguages);   
    });
  }

  onRemoveLanguage(index: number) {
    this.profileService.removeLanguage(index);
    this.languageSource = new MatTableDataSource(this.profileService.getLanguages);
  }

  openExpirienceDialog(): void {
    this.dialog.open(ExpirienceDialogComponent, {
      width: '600px'
    })
    .afterClosed()
    .subscribe(() => {
      console.log('expirience: ', this.profileService.getExpiriences)
      this.expirienceSource = new MatTableDataSource(this.profileService.getExpiriences);  
    });
  }

  onRemoveExpirience(index: number) {
    this.profileService.removeExpirience(index);
    this.expirienceSource = new MatTableDataSource(this.profileService.getExpiriences);
  }

  openTrainingDialog(): void {
    this.dialog.open(TrainingDialogComponent, {
      width: '600px'
    })
    .afterClosed()
    .subscribe(() => {
      this.trainingSource = new MatTableDataSource(this.profileService.getTrainings);  
    });
  }

  onRemoveTraining(index: number) {
    this.profileService.removeTraining(index);
    this.trainingSource = new MatTableDataSource(this.profileService.getTrainings);
  }

}
