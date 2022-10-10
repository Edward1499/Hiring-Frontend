import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProfileService } from 'src/app/client/services/profile.service';
import { PositionService } from '../../services/position.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.component.html',
  styleUrls: ['./hire.component.css']
})
export class HireComponent implements OnInit {

  form: FormGroup = this.fb.group({
    departmentId: [null, [Validators.required]],
    department: [null, [Validators.required]],
    personalId: [null, [Validators.required]],
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    startDate: [null, [Validators.required]],
    position: [null, [Validators.required]],
    monthlySalary: [null, [Validators.required]],
  });

  position: any;
  candidate: any;

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private candidateService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params 
      .pipe(
        map(data => {
          this.positionService.getById(data['positionId'])
            .subscribe(data => {
              this.position = data;
              this.form.controls['departmentId'].setValue(this.position.departmentId);
              this.form.controls['department'].setValue(this.position.department.name);
              this.form.controls['department'].disable();
            });
            this.candidateService.getCandidateById(data['candidateId'])
            .subscribe(data => {
              this.candidate = data;
              this.form.controls['personalId'].setValue(this.candidate.personalId);
              this.form.controls['personalId'].disable();
              this.form.controls['name'].setValue(this.candidate.name);
              this.form.controls['name'].disable();
              this.form.controls['surname'].setValue(this.candidate.surname);
              this.form.controls['surname'].disable();
            });
        })
      )
      .subscribe();
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
    }

    const request = {
      candidateId: this.candidate.id,
      positionId: this.position.id,
      startDate: this.form.controls['startDate'].value,
      position: this.form.controls['position'].value,
      monthlySalary: this.form.controls['monthlySalary'].value
    }
    this.positionService.hire(request)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Operacion realizada satisfactoriamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/posiciones'])
      });
    console.log(request)
  }

}
