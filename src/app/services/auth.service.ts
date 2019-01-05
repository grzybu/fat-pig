import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';

import {Observable, of} from 'rxjs';

import {User} from 'firebase';
import {tap, switchMap, startWith, take, map} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afAuth.user;
        } else {
          return of(null);
        }
      }),
      tap(user => localStorage.setItem('user', JSON.stringify(user))),
      startWith(JSON.parse(localStorage.getItem('user')))
    );
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): void {
    this.afAuth.auth.signOut().then(result => {
      this.router.navigate(['']);
    });
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
