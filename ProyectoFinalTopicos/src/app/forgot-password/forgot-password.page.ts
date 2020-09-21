import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router,private menu: MenuController) { 
    this.menu.enable(false, 'first');
  }

  ngOnInit() {
  }

  async onResetPassword(email) {
    try {
      await this.authSvc.resetPassword(email.value);
      alert("Revisar su correo se envió un mensaje para cambiar contraseña.");
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error->', error);
    }
  }

}
