import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginPath=environment.apiUrl + '/identity/login'
  private registerPath = environment.apiUrl + '/identity/register'  

  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
   

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('token') || '{}');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  login(data): Observable<any> {
    return this.http.post<any>(this.loginPath,data)
      .pipe(map(response => {
        if(response && response['token']){
          this.saveToken(response['token']);
          this.currentUserSubject.next(response.result);
        }
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(data): Observable<any> {
    return this.http.post(this.registerPath, data);
  }

  saveToken(token){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token');
  }


  isAuthenticated(){
    if(this.getToken()){
      return true;
    }
    return false;
  }

}
