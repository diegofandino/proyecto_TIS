import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  openSidebarSubject : Subject<boolean> = new Subject<boolean>() ;
  constructor(private http: HttpClient) {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
   }

  setModalStatus(openSidebar : boolean){
    this.openSidebarSubject.next(openSidebar);
   }

}
