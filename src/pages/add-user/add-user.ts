import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {

  user = {firstname: "", lastname: ""};

  constructor(
    public navCtrl: NavController, 
    private databaseprovider: DatabaseProvider,
    public toastCtrl: ToastController
  ) {
    
  }
  addUser() {
    let msg = this.user['firstname'];
    this.databaseprovider.addUser(this.user['firstname'], this.user['lastname'])
    .then(() => {
      console.log('User inserted!');
      let toast = this.toastCtrl.create({
        message: 'User: ' + msg + ' created!',
        duration: 3000
      });
      toast.present();
    })
    .catch(e => console.log(e));
    this.user = {firstname: "", lastname: ""};
  }

}
