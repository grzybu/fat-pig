import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  formErrors = {
    'email': '',
    'password': '',
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
    },
    'passwordConfirm': {
      'required': 'Password is required.',
      'match': 'Password does not match password'
    }
  };

  constructor(
    private  formBuilder: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  passwordMatchValidator(control: FormGroup) {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (!password.value || !passwordConfirm.value) {
      return null;
    }

    if (password.value !== passwordConfirm.value) {
      control.get('passwordConfirm').setErrors( {match: true} );
    } else {
      return null;
    }
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required
      ]
      ],
      'passwordConfirm': ['', [
        Validators.required,
      ]
      ],
    }, {validators: this.passwordMatchValidator});

    this.registerForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }


  register(): void {
    this.authService.register(this.registerForm.value['email'], this.registerForm.value['password']).then(
      result => {
        const data = {
          uid: result.user.uid,
          displayName: result.user.displayName ?  result.user.displayName : result.user.email,
          email: result.user.email
        };
        this.userService.updateUserData(data, result.user.uid);
        this.router.navigate(['/user/profile']);
      }
    ).catch(
      exception => {
        this.snackBar.open('Błąd tworzenie konta', 'X', {
          duration: 3000
        });
      }
    );
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm;
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
