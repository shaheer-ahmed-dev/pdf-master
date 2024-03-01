import { Injectable } from '@angular/core';
import { Profile } from '../domain/interface/profile-model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _userData?: any ;
  private _token: string = '';

  get userData(): any {
    if (!this._userData) {
      const data = localStorage.getItem('userData');
      this._userData = data ? JSON.parse(data) : null;
    }
    return this._userData;
  }

  set userData(data: any ) {
    this._userData = data;
    localStorage.setItem('userData', JSON.stringify(data));
  }

  get token(): string {
    if (!this._token) {
      let token = localStorage.getItem('token');
      this._token = token ? token : '';
    }
    return this._token;
  }
  set token(token: string) {
    this._token = token;
    localStorage.setItem('token', token);
  }
  public Logout() {
    localStorage.clear();
  }
}