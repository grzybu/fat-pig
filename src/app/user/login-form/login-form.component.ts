import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
    }
  };

  constructor(private  formBuilder: FormBuilder, private authService: AuthService, public snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required
      ]
      ],
    });

    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  login(): void {
    this.authService.login(this.loginForm.value['email'], this.loginForm.value['password']).then(
        result => {
           this.router.navigate(['user/profile']);
        }
    ).catch(
      exception => {
        this.snackBar.open('Błędny login/hasło', 'X', {
          duration: 3000
        });
      }
    );
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
