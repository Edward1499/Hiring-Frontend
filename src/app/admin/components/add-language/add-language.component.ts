import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    isActive: [null, [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<AddLanguageComponent>,
    private fb: FormBuilder,
    private languageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public languageData: any
  ) { }

  ngOnInit(): void {
    if (this.languageData) {
      this.form.controls['name'].setValue(this.languageData.name);
      this.form.controls['isActive'].setValue(this.languageData.isActive);
    }
  }

  add(): void {
    if (!this.form.valid) return;
    if (this.languageData) {
      this.languageService.update(this.languageData.id, this.form.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.languageService.create(this.form.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
    }   
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
