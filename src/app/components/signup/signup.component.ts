import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

//PARA MANEJAR REDIRECCIONES
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user= {};

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signUp() {
  this.auth.signUp(this.user)
    .subscribe(
      res => {
      console.log(res);
      localStorage.setItem('token',res.token);
      this.router.navigateByUrl('/private');
      },
      err => console.log(err)
    )
  }

}
