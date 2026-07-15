import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private auth = inject(Auth);
  private router = inject(Router);

  username = '';
  password = '';

  login() {

    this.auth.login(
      this.username,
      this.password
    ).subscribe({
      next: () => {
        this.router.navigate([
          '/dashboard'
        ]);
      },
      error: () => {
        alert(
          'Credenciales incorrectas'
        );
      }
    });
  }
}
