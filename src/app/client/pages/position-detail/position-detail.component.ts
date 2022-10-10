import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PositionService } from 'src/app/admin/services/position.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-position-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.css']
})
export class PositionDetailComponent implements OnInit {

  position: any;
  candidate: any;
  hasApplied: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(data => {
          if (data['id']) {
            this.positionService.getById(data['id'])
              .subscribe(data => {
                this.position = data;
              });
          }
        }),
        switchMap(() => this.profileService.getCandidateByUserId(this.authService.getUserId)),
        map(data => {
          if (data) {
            this.candidate = data;
          }
        }),
        switchMap(() => this.positionService.hasApplied({ positionId: this.position.id, candidateId: this.candidate.id })),
        map(hasApplied => this.hasApplied = hasApplied)
      ).subscribe();
  }

  apply() {
    this.positionService.apply({ positionId: this.position.id, candidateId: this.candidate.id })
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


}
