import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItem } from 'src/app/domain/interface/sidebar_model';
import { LocalStorageService } from 'src/app/services/localStorageService.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor (public router:Router, private localStorage : LocalStorageService) { }

  sidebarItems: SidebarItem[] = [
    {
      icon: "./../../../assets/icons/dashboard.png",
      label: "Dashboard",
      route: "dashboard",
    },
    {
      icon: "./../../../assets/icons/settings.png",
      label: "Settings",
      route: "settings"
    }, {
      icon: "./../../../assets/icons/logout.png",
      label: "Logout",
      route: "auth/login"
    },

  ];

  redirectTo(item: SidebarItem) {
    if(item.children == undefined){
      if(item.route == "auth/login"){
        this.localStorage.Logout();
      }
      this.router.navigateByUrl(item.route);
    }
  }
}
