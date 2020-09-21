import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router,private menu: MenuController) { 
    this.menu.enable(false, 'first');
  }

  ngOnInit() {
  }

  async onRegister(nombre,apellido,email, password) {
    try {
      const user = await this.authSvc.register(nombre.value,apellido.value,email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }

}
