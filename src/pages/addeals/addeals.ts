import { Component, Input,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AdddealsProvider } from '../../providers/adddeals/adddeals';
import { finalize } from 'rxjs/operators';
// import { Camera, CameraOptions } from "@ionic-native/camera";
import { Observable } from 'rxjs/Observable';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { HelperProvider } from '../../providers/helper/helper';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';



/**
 * Generated class for the AddealsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addeals',
  templateUrl: 'addeals.html',
})
export class AddealsPage {
  @Input() data : any;
  @Input() events: any;

  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  // image; 

  uploadPercent: Observable<number>;

  // deals;
  
  uid;

  dealsData={
   title:'',
   description:'',
   link:'' ,
   price:'',
   startdate:'',
   enddate:'',
   image:'',
   category:'',
   coupon:'',
   userId:''
  }
  // uploadImageId: any;
  // sourcex: any;
  // base64Image;
    createdCode = null;
  sourcex: any;
  base64Image: string;
  uploadImageId: any;
  image: any;
  
  constructor(private helper: HelperProvider, private androidPermissions: AndroidPermissions, private camera: Camera,
    private fireStorage: AngularFireStorage, public afAuth : AngularFireAuth,private navCtrl: NavController,public api: AdddealsProvider) 

  { 
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    success => console.log('Permission granted'),
    err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA,this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
  ).catch(err=> console.log(`cordova error`))
  }

  //adding deals to the firestore
addDeals(){
  //create a deal object
  let data = {
    title : this.dealsData.title,
    description: this.dealsData.description,
    influencerid : localStorage.getItem('uid'),
    link: this.dealsData.link,
    price: this.dealsData.price,
    startdate: this.dealsData.startdate,
    enddate: this.dealsData.enddate,
    image: this.image,  
    category: this.dealsData.category,
    coupon: this.dealsData.coupon
  }
  console.log(data)
  if(this.image !== '')
  this.api.createDeal(data).then(res=>{
    console.log('deal created')
  }
    ,err=>{
    console.log(`error found`)
    
  });
  else{
    this.helper.presentToast('Please fill all fields',1500,'bottom')
  }
  this.helper.load()
  this.helper.presentBottomToast('Deal Added!')
  this.navCtrl.push("TabhomePage");
}


// createCode(){

//   console.log("clicked")
//   this.createdCode = this.dealsData.qrdata;
//   console.log(this.createdCode);
// }

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


