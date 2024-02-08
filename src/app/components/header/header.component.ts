import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private localStorage: LocalStorageService) { }
ngOnInit(): void {
  this.userName = this.localStorage.userData.employeeName;
}
togglePopup: Boolean = false;
userName: String = "";
}
