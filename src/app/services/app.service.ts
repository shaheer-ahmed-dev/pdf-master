import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { LocalStorageService } from './localStorageService.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  madniUrlBase = 'http://192.168.1.191:5000';
  liveBaseurl = 'https://ec2-3-110-92-163.ap-south-1.compute.amazonaws.com';
  hassanUrlBase = 'http://192.168.0.119:5000';
  urlBase = this.madniUrlBase;

  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': ''
  });

  constructor(private http: HttpClient, private localStorageService : LocalStorageService) { }

  setAuthToken() {
    let auth: string | null = '';
    auth = this.localStorageService.token;
    this.headers = this.headers.set('Authorization', `Bearer ${auth}`);
  }

  get(url: string , params?: any) {
    this.setAuthToken();
    let queryParams = new HttpParams();
    let keys = Object.keys(params);
    keys.forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    }
    );
      return this.http.get(this.urlBase + url, { headers: this.headers, params: queryParams }).pipe(
        
       
        catchError((error: any) => {
          console.log("error:", error);
          return throwError(() => new Error(error));
        })
      );
  }

  post(url: string, data: any,) {  
    this.setAuthToken();
    let res = this.http.post(this.urlBase + url, data, { headers: this.headers}).pipe(
      catchError((error: any) => {
        console.log("error:", error);
        return throwError(() => new Error(error));
      })
    );
    console.log(res);
    return res;
  }

  put(url: string, data: any) { 
    this.setAuthToken();
    let res = this.http.put(this.urlBase + url, data, { headers: this.headers }).pipe(
    
      catchError((error: any) => {
        console.log("error:", error);
        return throwError(() => new Error(error));
      })
    );
    console.log(res);
    return res;
  }

  delete(url: string) { 
    this.setAuthToken();
    try {
      return this.http.delete(this.urlBase + url, { headers: this.headers }).pipe(
       
        catchError((error: any) => {
          console.log("error:", error);
          return throwError(() => new Error(error));
        })
      );
    } catch (error:any) {
      return throwError(() => new Error(error.toString()));
    }
  }
  upload(url: string, file: any) {
    this.setAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    let res = this.http.post(this.urlBase + url, formData, { headers: this.headers }).pipe(
      catchError((error: any) => {
        console.log("error:", error);
        return throwError(() => new Error(error));
      })
    );
  
    console.log(res);
    return res;
  }


}
