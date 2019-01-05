import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {UserData} from '../user-data';
import {tap, delay} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  userDataObservable: Observable<UserData|null>;

  formErrors = {
    'displayName': '',
    'weight': '',
    'height': ''
  };

  validationMessages = {
    'displayName': {
      'required': 'displayName is required.',
    },
    'weight': {
      'required': 'weight is required.',
    },
    'height': {
      'required': 'height is required.',
    }
  };

  constructor(private formBuilder: FormBuilder, public authService: AuthService, public userService: UserService, private matSnack: MatSnackBar) {
    this.userDataObservable = userService.userData.pipe(
      tap(userData => {
          this.profileForm.patchValue(userData ? userData : {});

      })
    );
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.profileForm = this.formBuilder.group({
      'displayName': ['', []
      ],
      'weight': ['', [
        Validators.required,
      ]
      ],
      'height': ['', [
        Validators.required
      ]
      ],
    });

    this.profileForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  public updateUserData() {
    if (this.profileForm.valid) {
      this.userService.updateUserData(this.profileForm.value).then(
        result => {
          this.matSnack.open('Zaktualizowano dane', 'x', 3000);
        }
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.profileForm) {
      return;
    }
    const form = this.profileForm;
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
