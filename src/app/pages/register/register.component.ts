import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationFailed: Boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.registrationFailed = false;
    let registrationSubscription = this.authenticationService.register(form.value.name, form.value.email, form.value.password).subscribe(
      (response) => {
        AuthenticationService.token = response['token'];
        console.log('Registration Successful !');
        console.log(response);
        registrationSubscription.unsubscribe();
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.registrationFailed = true;
        console.log('Registration Failed !');
        registrationSubscription.unsubscribe();
        console.log(error);
      }
    )
  }
}
