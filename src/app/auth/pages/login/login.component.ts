import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

login(): void {
    const { email, password } = this.form.value;
    const request = {
        email: email,
        password: password,
    }
    this.authService.login(request)
        .subscribe((data) => {
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            if (data.roles.includes('Admin')) {
              this.router.navigate(['/admin'])
            } else {
              this.router.navigate(['/client'])
            }
        });
}

}
