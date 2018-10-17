import { Component, OnInit } from '@angular/core';

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
      new NavbarItem('初始化编辑器', '/init')
    ];
  }
  
}

class NavbarItem {
  constructor(public itemName: string, public itemLink: string) {}
}
