import { EditUserPage } from './../edit-user/edit-user';
import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  
  users = [];

  constructor( 
    public navCtrl: NavController, 
    private databaseprovider: DatabaseProvider,
    public toastCtrl: ToastController
    ) {
  
  }

  ionViewDidLoad() {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadDeveloperData();
      }
    })
  }
  
  ionViewWillEnter() {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadDeveloperData();
      }
    })
  }
  
  loadDeveloperData() {
    this.databaseprovider.getAllUsers().then(data => {
      this.users = data;
    })
  }

  deleteUser(user) {
    let msg = user.firstname;
    this.databaseprovider.deleteUser(user.id)
    .then(() => {
      let toast = this.toastCtrl.create({
        message: 'User: ' + msg + ' deleted!',
        duration: 3000
      });
      toast.present();
      this.loadDeveloperData();
    })
    .catch(e => console.log(e));
  }

  editUser(user) {
    this.navCtrl.push(EditUserPage, {
      user: user
    });
  }

}
