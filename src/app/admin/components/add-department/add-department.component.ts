import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    isActive: [null, [Validators.required]]
  });
  
  constructor(
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public departmentData: any
  ) { }

  ngOnInit(): void {
    if (this.departmentData) {
      this.form.controls['name'].setValue(this.departmentData.name);
      this.form.controls['isActive'].setValue(this.departmentData.isActive);
    }
  }

  add(): void {
    if (!this.form.valid) return;
    if (this.departmentData) {
      this.departmentService.update(this.departmentData.id, this.form.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.departmentService.create(this.form.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
    }   
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
