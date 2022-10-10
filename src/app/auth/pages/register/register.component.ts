import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

register(): void {
    const { email, password } = this.form.value;
    const request = {
        email: email,
        password: password,
    }
    this.authService.register(request)
        .subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Operacion realizada satisfactoriamente!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['/auth/login'])   
        });
}

}
