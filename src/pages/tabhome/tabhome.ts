import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AdddealsProvider } from '../../providers/adddeals/adddeals';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import {SelectSearchableModule, SelectSearchableComponent} from 'ionic-select-searchable'
import { LoginPage } from '../login/login';
import { HelperProvider } from '../../providers/helper/helper';
import { QrcodePage } from '../qrcode/qrcode';

/**
 * Generated class for the TabhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabhome',
  templateUrl: 'tabhome.html',
})
export class TabhomePage{
  // @ViewChild('content') nav: NavController;

  // rootPage:any = LoginPage;

  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
  user1 = null;
  userIds = []

  dealsData;

  data : any;
  
  @Input() events: any;

  searchTerm: any = "";
  allItems: any;
  searchCat: any;
  searchDeals: any;

  constructor(private helper: HelperProvider, private navCtrl: NavController,
    public afAuth : AngularFireAuth, public firestore : AdddealsProvider,private toastCtrl:ToastController) { }

  

  deals;
  user;
  uid;

  ionViewDidLoad(){
    this.getDeals();
    this.getUser();
  }

//getting the current influencer id, which will further use in tabhome.html in getting the 'user'
  getUser(){
    console.log(this.afAuth.auth.currentUser);   //
    let uid = localStorage.getItem('uid');
    console.log(uid)
    //giving getInfluencer the uid and storing the data to the user which we will furthur use in the html
    this.firestore.getInfluencer(uid).subscribe(res=>{
      this.user = res;  
       console.log(this.user)                    //assigning user the data
    })
  }


  //getting the data of deals, mapping the data i.e. data,id and saving it in 'deals' object
  getDeals(){
    this.firestore.getInfluencerDeals(this.uid).pipe(     
      map(actions => actions.map(a => {      //.map, what kind of data i need i.e. data, id
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };

      }))).subscribe(response=>{      //.subscribe, now i need data 
        this.deals = response;    
        console.log(this.deals);
        this.getCat();  //
      })
  }



  updateDeals(itemid){
    this.navCtrl.push("UpdateDealsPage",{item: JSON.stringify(itemid)});
  }
  // updateDeals(id,data){
  //   return this.firestore.updateDeal(id, data).then(res=>{
  //     console.log(`deal updated`);
  //   })
  // }

  viewDeal(item,i){
    console.log(item.id)
    this.navCtrl.push("ViewDealPage",{
      id: item.id
    }
    );
  }
  qrcode(){
    this.navCtrl.push(QrcodePage)
  }

  addeals(){
    this.navCtrl.push("AddealsPage");
  }

  deleteDeal(id){
    this.firestore.deleteDeal(id).then(res=>{
      this.helper.presentBottomToast('Deal deleted!')
      console.log('deal deleted')
    })
  }



  ngOnInit(){
    this.uid = localStorage.getItem('uid'); //getting the user id and we will pass it in the html
  }

  viewUser(user){
    console.log(user)
    this.navCtrl.push("UsernamePage",{
      id: user
    }
    );
  }

  //searchbar, search query
  getItems(ev: any) {


    const val = ev.target.value;

    // set val to the value of the searchbar

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchDeals = this.searchDeals.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      }) ;
    }
    else{
      this.getCat();
    }
  } 
  getCat(){
    this.searchDeals = this.deals;
  }

  
  logout(){
    this.helper.load()
    this.navCtrl.push(LoginPage);
  }



  

  // userChanged(event: {component: SelectSearchableComponent, value:any}){
  //     console.log('event', event);
  // }

  // onClose(){
  //     let toast = this.toastCtrl.create({

  //       message: 'Thanks for your selection',
  //       duration: 2000
  //     });
  //     toast.present();
  // }

  // openFromCode(){
  //   this.selectComponent.open();
  // }

  // onEvent(event: string, item: any) {//ITEM [EVENT OR SELECTED ITEM]
  //   if (this.events[event]) {
  //     if ('onTextChange' === event) {
  //       this.getItems(item);
  //       this.events[event](this.searchTerm);
  //     } else {
  //       this.events[event](item);
  //     }
  //   }
  //   console.log(event);
  // }





  
    //retrieving data from the firestore (adddeals)
  // ngOnInit(){
  //     this.firestore.getDeals().pipe(map(
  //     list => {
  //        list.map(
  //         items => {
  //           const data = items.payload.doc.data();
  //           const id = items.payload.doc.id;
            
  //           return { id,...data}
  //         }
  //       )

  //     }
  //   )).subscribe( res =>{
  //     this.dealsData = res;
  //     console.log(this.dealsData)
  //   })

  // }

}
