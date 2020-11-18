import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: String;
  password: String;
  invalidCredentials: Boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
  }
  ngOnDestroy() {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.invalidCredentials = false;
    let loginSubscription = this.authenticationService.login(form.value.email, form.value.password).subscribe(
      (response) => {
        AuthenticationService.token = response['token'];
        console.log('Authentication Successful !');
        console.log(response);
        loginSubscription.unsubscribe();
        console.log(AuthenticationService.isAuthenticated());
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.invalidCredentials = true;
        console.log('Authentication Failed !');
        console.log(error);
        loginSubscription.unsubscribe();
      }
    );
  }

}
