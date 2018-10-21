import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, IonicPage } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

import { SignupPage } from '../signup/signup';
import { Login1Page } from '../login1/login1';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	@Input() data = {
    "background"     : "assets/images/background/39.jpg",
        "forgotPassword" : "Forgot password?",
        "email"           : "Email",
        "title"          : "Welcome Abroad",
        "username"       : "Name",
        "password"       : "Password",
        "login"          : "Instagram",
        "logo"           : "assets/images/logo/2.png",
        "errorUser"       : "Field can't be empty",
        "errorPassword"   : "Field can't be empty"
  }
  @Input() events: any;
	
  public username: string;
  public email : string;
  public number : number;
	public password: string;
	loginError: string;


  // public userData;

  public isUsernameValid: boolean = true;
  public isPasswordValid: boolean = true;
  public credentials;

  constructor(private navCtrl: NavController,private auth : AuthService) { }

  onEvent = (event: string): void => {
      if (event == "onLogin" && !this.validate()) {
          return ;
      }
      if (this.events[event]) {
          this.events[event]({
              'username' : this.username,
              'password' : this.password
          });
      }
		}



		login(){
			if (true) {
				this.credentials = {
						email: this.email,
						password: this.password
				}
				this.auth.login(this.credentials).then(
					() => this.navCtrl.setRoot(HomePage),
				error => this.loginError = error.message
			);
				
		}
		}




  
    validate():boolean {
      this.isUsernameValid = true;
      this.isPasswordValid = true;

      if (!this.password || this.password.length == 0 && !this.username || this.username.length == 0) {
        this.isPasswordValid = false;
        this.isUsernameValid = false;
      }

      return this.isPasswordValid && this.isUsernameValid;
   }

}
