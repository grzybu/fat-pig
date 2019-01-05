import { Injectable } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable, of} from 'rxjs';
import {UserData} from './user-data';
import {map, switchMap, take, tap} from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userData: Observable<UserData|null>;
  private userUid: string;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.userData = this.authService.user.pipe(
      switchMap(user => {
        if (user) {
          console.log(user.uid);
          this.userUid = user.uid;
          return this.afs.doc<UserData>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
    );
  }

  public updateUserData(data, uid?): Promise<void> {
    const  userID  = uid ? uid : this.userUid;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userID}`);
    return userRef.set(data, { merge: true });
  }
}
