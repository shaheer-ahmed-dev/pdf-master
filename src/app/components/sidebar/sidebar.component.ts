import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItem } from 'src/app/domain/interface/sidebar_model';
import { LocalStorageService } from 'src/app/services/localStorageService.service';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor (public router:Router, private localStorage : LocalStorageService, private supa: SupabaseService) { }
  // ngOnInit(): void {
  //   // this.name = this.supa.session?.user.email;
  // }
name? : string ;
  sidebarItems: SidebarItem[] = [
    {
      icon: "./../../../assets/icons/dashboard.png",
      label: "Edit PDF",
      route: "convert",
    },
    {
      icon: "./../../../assets/icons/settings.png",
      label: "Admin Panel",
      route: "adminPanel"
    }, {
      icon: "./../../../assets/icons/policy.png",
      label: "Account",
      route: "account"
    },
     {
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
