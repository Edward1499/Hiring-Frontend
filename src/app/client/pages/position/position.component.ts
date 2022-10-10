import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PositionService } from 'src/app/admin/services/position.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  positions: any[] = [];
  candidate: any;

  constructor(
    private positionService: PositionService,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.positionService.getAllActive()
      .pipe(
        map(data => {
          this.positions = data;
        }),
        switchMap(() => this.profileService.getCandidateByUserId(this.authService.getUserId)),
        map(data => {
          if (data) {
            this.candidate = data;
          }
        }),
      )
      .subscribe();
  }

  apply(position: any) {
    this.positionService.hasApplied({ positionId: position.id, candidateId: this.candidate.id })
    .subscribe(hasApplied => {
      if (hasApplied) {
        Swal.fire({
          icon: 'warning',
          title: 'Ya haz aplicado a esta posicion!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        this.positionService.apply({ positionId: position.id, candidateId: this.candidate.id })
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Operacion realizada satisfactoriamente!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/client/posiciones'])
        });
      }
    });
  }

}
