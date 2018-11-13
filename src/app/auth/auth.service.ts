import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { UIService } from "../shared/ui.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated: boolean = false;
  public authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private uiService: UIService
  ) {}

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
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
          this.uiService.showSnackbar(error.message, null, 3000);
        }
      )
      .finally(() => {
        this.uiService.loadingStateChanged.next(false);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(
        result => {
          this.authSuccessfully();
          this.authChange.next(true);
          this.router.navigate(["training"]);
        },
        error => {
          this.uiService.showSnackbar(error.message, null, 3000);
        }
      )
      .finally(() => {
        this.uiService.loadingStateChanged.next(false);
      });
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
