import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddLanguageComponent } from '../../components/add-language/add-language.component';
import { LanguageService } from '../../services/language.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private languageService: LanguageService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.languageService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }

  openDialog(language: any = null): void {
    this.dialog.open(AddLanguageComponent, {
      width: '350px',
      data: language
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
        this.languageService.delete(id)
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
