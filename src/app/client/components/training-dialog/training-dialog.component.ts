import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile.service';
import { ExpirienceDialogComponent } from '../expirience-dialog/expirience-dialog.component';

@Component({
  selector: 'app-training-dialog',
  templateUrl: './training-dialog.component.html',
  styleUrls: ['./training-dialog.component.css']
})
export class TrainingDialogComponent implements OnInit {

  form: FormGroup = this.fb.group({
    description: [null, [Validators.required]],
    academicLevel: [null, [Validators.required]],
    startDate: [null, [Validators.required]],
    endDate: [null],
    institution: [null, [Validators.required]],
  });

  academicLevels: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<TrainingDialogComponent>, 
    private profileService: ProfileService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profileService.getAcademicLevels()
      .subscribe(data => this.academicLevels = data);
  }

  add(): void {
    if (!this.form.valid) return;
    console.log(this.form.value);
    this.profileService.pushTraining(this.form.value);
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
