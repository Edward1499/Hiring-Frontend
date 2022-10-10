import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompetitionService } from '../../services/competition.service';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.css']
})
export class AddCompetitionComponent implements OnInit {

  form: FormGroup = this.fb.group({
    description: [null, [Validators.required]],
    isActive: [null, [Validators.required]]
  });

  constructor(
    public dialogRef: MatDialogRef<AddCompetitionComponent>,
    private fb: FormBuilder,
    private competitionService: CompetitionService,
    @Inject(MAT_DIALOG_DATA) public competitionData: any
  ) { }

  ngOnInit(): void {
    if (this.competitionData) {
      this.form.controls['description'].setValue(this.competitionData.description);
      this.form.controls['isActive'].setValue(this.competitionData.isActive);
    }
  }

  add(): void {
    if (!this.form.valid) return;
    if (this.competitionData) {
      this.competitionService.update(this.competitionData.id, this.form.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.competitionService.createCompetition(this.form.value)
      .subscribe(() => {
        this.dialogRef.close();
      });
    }   
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
