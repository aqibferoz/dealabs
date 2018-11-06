import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NavController } from 'ionic-angular';
// import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
    

	constructor(public afAuth: AngularFireAuth) {	}

	login(credentials){
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
	}

	authenticated(){
		this.afAuth.auth.onAuthStateChanged(user=>{
           if(user){
			   return true
		   }else{
			   return false
		   }
		},err=>{
			return false
		}
		)
	}

	getEmail() {
		return //this.user && this.user.email;
	}

	logout() {
		localStorage.removeItem('');
		// this.navCtrl.push('LoginPage');

	}

	updatePassword(password){
		const user = this.afAuth.auth.currentUser;
		user.updatePassword(password);
	}

	getUid(){
		return this.afAuth.auth.currentUser.uid;
	}

	
	
	

}
