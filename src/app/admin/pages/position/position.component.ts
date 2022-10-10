import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidateDialogComponent } from '../../components/candidate-dialog/candidate-dialog.component';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  positions: any[] = [];

  constructor(
    private positionService: PositionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.positionService.getAll()
      .subscribe(data => {
        this.positions = data;
      });
  }

  openDialog(position: any): void {
    this.dialog.open(CandidateDialogComponent, {
      width: '600px',
      data: position
    })
    .afterClosed()
    .subscribe(() => {
        this.loadData();
    });
  }

}
