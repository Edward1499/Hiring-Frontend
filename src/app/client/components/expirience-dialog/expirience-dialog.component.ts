import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-expirience-dialog',
  templateUrl: './expirience-dialog.component.html',
  styleUrls: ['./expirience-dialog.component.css']
})
export class ExpirienceDialogComponent implements OnInit {

  form: FormGroup = this.fb.group({
    company: [null, [Validators.required]],
    currentPosition: [null, [Validators.required]],
    startDate: [null, [Validators.required]],
    endDate: [null],
    salary: [null, [Validators.required]],
  });

  constructor(
    public dialogRef: MatDialogRef<ExpirienceDialogComponent>, 
    private profileService: ProfileService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  } 

  add(): void {
    if (!this.form.valid) return;
    console.log(this.form.value);
    this.profileService.pushExpirience(this.form.value);
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
