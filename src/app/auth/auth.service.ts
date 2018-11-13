import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated: boolean = false;
  public authChange = new Subject<boolean>();

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(
        result => {
          this.authSuccessfully();
          console.log(result);
          this.authChange.next(true);
          this.router.navigate(["training"]);
        },
        error => {
          console.log(error);
        }
      );
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(
        result => {
          this.authSuccessfully();
          this.authChange.next(true);
          this.router.navigate(["training"]);
        },
        error => {
          console.log(error);
        }
      );
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(["login"]);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
}
