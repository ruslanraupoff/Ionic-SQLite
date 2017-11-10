import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { UsersPage } from './../users/users';
import { AddUserPage } from './../add-user/add-user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddUserPage;
  tab3Root = UsersPage;

  constructor() {

  }
}
