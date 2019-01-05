import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
  MatTabsModule, MatDividerModule,
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

import { CoreModule } from './core/core.module';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginRegisterComponent } from './user/login-register/login-register.component';
import { HomeComponent } from './home/home.component';
import { BmiPipe } from './user/pipes/bmi.pipe';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    LoginFormComponent,
    ProfileComponent,
    RegisterComponent,
    LoginRegisterComponent,
    HomeComponent,
    BmiPipe
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule, MatCardModule, MatMenuModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatTabsModule, MatDividerModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
