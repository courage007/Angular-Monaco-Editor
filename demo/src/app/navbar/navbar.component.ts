import { Component, OnInit } from '@angular/core';
import { APP_ROUTE_PATH } from '../app-routing-path';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  private navbarItems: Array<NavbarItem>;

  constructor() { }

  ngOnInit() {
    this.navbarItems = [
      new NavbarItem('基本初始化', APP_ROUTE_PATH.baseInit),
      new NavbarItem('模型初始化', APP_ROUTE_PATH.modelInit)
    ];
  }
  
}

class NavbarItem {
  constructor(public itemName: string, public itemLink: string) {}
}
