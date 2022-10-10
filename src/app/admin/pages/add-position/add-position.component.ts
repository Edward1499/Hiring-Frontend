import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DepartmentService } from '../../services/department.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import Swal from 'sweetalert2';
import { PositionService } from '../../services/position.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.css']
})
export class AddPositionComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Introduzca la descripcion aqui...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  form: FormGroup = this.fb.group({
    departmentId: [null, [Validators.required]],
    name: [null, [Validators.required]],
    riskLevel: [null, [Validators.required]],
    minSalary: [null, [Validators.required]],
    maxSalary: [null, [Validators.required]],
    description: [null, [Validators.required]],
    isActive: [null, [Validators.required]],
  });

  departments: any[] = [];

  riskLevels: any[] = [
    { id: 1, value: 'Bajo' },
    { id: 2, value: 'Medio' },
    { id: 3, value: 'Alto' },
  ]

  position: any;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: any[] = [];

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private positionSerice: PositionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.departmentService.getAll()
      .pipe(
        map(data => this.departments = data),
        switchMap(() => this.route.params),
        map(data => {
          if (data['id']) {
            this.positionSerice.getById(data['id'])
              .subscribe(data => {
                this.position = data;
                this.loadData();
              });
          }
        })
      )
      .subscribe();

  }

  loadData() {
    this.form.reset(this.position);
    this.skills = this.position.skills.map((x: any) => ({name: x.description}));
  }

  save() {
    if (!this.form.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario no valido!',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    };
    const request = {
      ...this.form.value,
      skills: this.skills.map(x => ({ description: x.name }))
    }

    if (this.position) {
      this.positionSerice.update(this.position.id, request)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Operacion realizada satisfactoriamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/posiciones'])
      });
    } else {
      this.positionSerice.create(request)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Operacion realizada satisfactoriamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/posiciones'])
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skills.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(skill: any): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

}
