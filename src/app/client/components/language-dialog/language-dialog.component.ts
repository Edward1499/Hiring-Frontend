import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-language-dialog',
  templateUrl: './language-dialog.component.html',
  styleUrls: ['./language-dialog.component.css']
})
export class LanguageDialogComponent implements OnInit {

  languages: any[] = [];
  levels: any[] = [
    { id: 1, value: 'Basico' },
    { id: 2, value: 'Intermedio' },
    { id: 3, value: 'Avanzado' },
  ]

  form: FormGroup = this.fb.group({
    language: [null, [Validators.required]],
    level: [null, [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<LanguageDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profileService: ProfileService,
    private fb: FormBuilder,) { 
  }

  ngOnInit(): void {
    this.profileService.getLanguagesList()
      .subscribe(data => this.languages = data);
  }

  add(): void {
    if (!this.form.valid) return;
    console.log(this.form.value);
    this.profileService.pushLanguage(this.form.value);
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
