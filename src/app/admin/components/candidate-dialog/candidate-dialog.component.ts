import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.css']
})
export class CandidateDialogComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'personalId', 'salary', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<CandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public position: any,
    private positionService: PositionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.positionService.getAllByPositionId(this.position.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  hire(candidate: any) {
    this.dialogRef.close();
    this.router.navigate(['/admin/contratar', this.position.id, candidate.id]);
  }

}
