import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  openSidebarSubject : Subject<boolean> = new Subject<boolean>() ;
  constructor(private http: HttpClient) {
   }

  setModalStatus(openSidebar : boolean){
    this.openSidebarSubject.next(openSidebar);
   }

  crearUsuario( objeto ){
      return this.http.post( `${environment.url}user/create`, objeto , {headers: this.headers});
  }
  obtenerDatosById( objeto ){
      return this.http.get( `${environment.url}user/${objeto}` , {headers: this.headers});
  }
  eliminarUsuario( id ){
      return this.http.post( `${environment.url}user/delete`, id , {headers: this.headers});
  }
  listarUsuarios( ){
      return this.http.get( `${environment.url}user/`);
  }

  crearTrabajador( objeto ){
    return this.http.post( `${environment.url}trabajador/create`, objeto , {headers: this.headers});
}
  eliminarTrabajador( id ){
    return this.http.post( `${environment.url}trabajador/delete`, id , {headers: this.headers});
}
  listarTrabajadores( ){
    return this.http.get( `${environment.url}trabajador/`);
}

  crearProveedor( objeto ){
    return this.http.post( `${environment.url}proveedor/create`, objeto , {headers: this.headers});
}
  eliminarProveedor( id ){
    return this.http.post( `${environment.url}proveedor/delete`, id , {headers: this.headers});
}
  listarProveedores( ){
    return this.http.get( `${environment.url}proveedor/`);
}

}
