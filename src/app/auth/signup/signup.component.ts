import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {}



  ngOnInit() {
    this.InitForm();
  }
    matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  InitForm() {

    this.signUpForm = this.formBuilder.group({
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      password2: ['', [ Validators.required, this.matchValues('password')]],
    });
  }
  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onSubm() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
