import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { LoginPage } from '../login/login';
import { HelperProvider } from '../../providers/helper/helper';
import { finalize } from 'rxjs/operators';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import {
    AngularFireStorage,
    AngularFireStorageReference,
    AngularFireUploadTask
  } from 'angularfire2/storage';
  import { CameraOptions, Camera } from '@ionic-native/camera';
  import { AndroidPermissions } from '@ionic-native/android-permissions';
  

@IonicPage()
@Component({
  selector: 'page-login1',
  templateUrl: 'login1.html',
})
export class Login1Page { 
  @Input() data = {
    "background"     : "assets/images/background/39.jpg",
        "forgotPassword" : "Forgot password?",
        "email"           : "Email",
        "title"          : "Welcome Abroad",
        "username"       : "Name",
        "password"       : "Password",
        "number":"Phone number",
        
        // "logo"           : "assets/images/logo/2.png",
        // "errorUser"       : "Field can't be empty",
        // "errorPassword"   : "Field can't be empty"
  }
  @Input() events: any;

  public username: string;
  public email : string;
  public number : number;
  public password: string;
  public gender: string;

  public userData;


  private isUsernameValid: boolean = true;
  private isPasswordValid: boolean = true;
  private credentials;
  form: FormGroup;

  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  // image; 

  sourcex: any;
  base64Image: string;
  uploadImageId: any;
  image

  uploadPercent: Observable<number>;

  

  constructor(private helper:HelperProvider, private fb: FormBuilder,private androidPermissions: AndroidPermissions, private camera: Camera,
    private fireStorage: AngularFireStorage,
    private navCtrl: NavController,private auth : AuthService, private firestore: FirestoreProvider) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([Validators.email, Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            phone: ['', Validators.required],
            // gender: ['', Validators.required]
        })

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
            success => console.log('Permission granted'),
            err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA,this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
          ).catch(err=> console.log(`cordova error`))
     }


    ionViewDidLoad(){

    }

    get f() { return this.form.controls; }

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

    signup(form){
        let name = form.value.name;
        let email = form.value.email;
        let password = form.value.password;
        // let gender = form.value.gender;
        let phone = form.value.phone;
        if (true) {
            this.credentials = {
                email: email,
                password: password
            }
            this.auth.signUp(this.credentials).then(
                resp => {
                    this.userData = {
                        email: email,
                        username: name,
                        // gender: gender,
                        number: phone
                    }
                    this.firestore.saveUser(resp.user.uid, this.userData);
                    this.helper.load()  
                    this.helper.presentBottomToast('User Registered!')
                    this.navCtrl.push(LoginPage)
                }
            )
        }
    }
    login(){
        this.navCtrl.push("LoginPage")
    }

    toggleForm(){
        this.navCtrl.push(LoginPage);
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
   uploadPhoto(){
    this.uploadImageId = Math.floor(Date.now() / 1000);
    this.ref = this.fireStorage.ref(`deals/${this.uploadImageId}`);
    let task = this.ref.putString(this.base64Image, 'data_url');
     task.snapshotChanges() 
     .pipe(finalize(() => {
       this.ref.getDownloadURL().subscribe(url => {
         this.image = url;
       });
     })).subscribe();      
  
  }
  
  
  
   takePhoto(source){
    if(source === 'camera'){
      this.sourcex =this.camera.PictureSourceType.CAMERA;
      
    }else if(source === 'library'){
      this.sourcex =this.camera.PictureSourceType.PHOTOLIBRARY;
  
    }
    
      const options: CameraOptions = {
        sourceType: this.sourcex,
        quality: 30,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
  
      this.camera.getPicture(options).then((imageData) => {
  
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.uploadPhoto();
      }, (err) => {
      // Handle error
      console.log(err);
      });
  }
  
  
  //uploadig image
  
  // upload(event) {
  //   let id = Math.floor(Date.now() / 1000); 
  //   const file = event.target.files[0];
  //   const filePath = 'somename/';
  //   const fileRef = this.fireStorage.ref(id.toString());
  //   const task = fileRef.put(file);
  
  //   // observe percentage changes
  //   this.uploadPercent = task.percentageChanges();
  //   // get notified when the download URL is available
  //   task.snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe(res=>{
  //           this.downloadURL = res;
  //           console.log(this.downloadURL);
  //         })
  //       })
  //    )
  //   .subscribe()
  // }
  
  
  choosePicture(){
    let myfunc = () => {
      this.takePhoto('library');
    };
    let myfunc1 = () => {
      this.takePhoto('camera');
    };
    this.helper.presentActionSheet('Choose an option.','Gallery','Camera',myfunc,myfunc1);
  }
}
