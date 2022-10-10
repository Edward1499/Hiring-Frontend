import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AddDepartmentComponent } from '../../components/add-department/add-department.component';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private departmentService: DepartmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.departmentService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(department: any = null): void {
    this.dialog.open(AddDepartmentComponent, {
      width: '350px',
      data: department
      //enterAnimationDuration,
      //exitAnimationDuration,
    })
    .afterClosed()
    .subscribe(() => {
        this.loadData();
    });
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Una vez eliminado no se podra revertir la operacion!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.delete(id)
          .subscribe(() => {
            Swal.fire(
              'Eliminado!',
              'Este registro ha sido eliminado.',
              'success'
            );
            this.loadData();
          });
        
      }
    })
  }

}
