import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route: Router) { }

  login( usuario ){
    return this.http.post( `${environment.url}user/login`, usuario )
      .pipe( map ((token) => {
        console.log(token);
        localStorage.setItem('token', token['token']);
        return token;
      }));
  }

  estaAutenticado(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  obtenerToken(){
    const obtenerToken = localStorage.getItem('token');
    return obtenerToken;
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['../login']);
  }

}
