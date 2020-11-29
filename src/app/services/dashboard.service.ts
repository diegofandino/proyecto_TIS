import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { usuariosPDF } from '../models/usuariosPDF.models';



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
  actualizarUsuario( objeto ){
    return this.http.post( `${environment.url}user/update`, objeto , {headers: this.headers});
  }
  eliminarUsuario( id ){
      return this.http.post( `${environment.url}user/delete`, id , {headers: this.headers});
  }
  listarUsuarios( ){
      return this.http.get( `${environment.url}user/`);
  }
  listarUsuariosPDF( ){
      return this.http.get( `${environment.url}user/`)
      .pipe( map (data => {
            return data['usuarios'].map(
              usuario => ({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                documento: usuario.documento,
                email: usuario.email,
                telefono: usuario.telefono,
              })
            )
      } ));
  }

  crearCliente( objeto ){
    return this.http.post( `${environment.url}cliente/create`, objeto , {headers: this.headers});
  }
  obtenerDatosByIdCli( objeto ){
    return this.http.get( `${environment.url}cliente/${objeto}` , {headers: this.headers});
  }
  actualizarCliente( objeto ){
  return this.http.post( `${environment.url}cliente/update`, objeto , {headers: this.headers});
  }
  listarClientes( ){
    return this.http.get( `${environment.url}cliente/`);
  }

  listarClientesPDF( ){
    return this.http.get( `${environment.url}cliente/`)
    .pipe( map (data => {
          return data['clientes'].map(
            usuario => ({
              nombre: usuario.nombre,
              identificacion: usuario.identificacion,
              direccion: usuario.direccion,
              email: usuario.email,
              telefono: usuario.telefono,
            })
          )
    } ));
  }

  crearTrabajador( objeto ){    
    return this.http.post( `${environment.url}trabajador/create`, objeto , {headers: this.headers});
  }
  obtenerDatosByIdTra( objeto ){
    return this.http.get( `${environment.url}trabajador/${objeto}` , {headers: this.headers});
  }
  actualizarTrabajador( objeto ){
    return this.http.post( `${environment.url}trabajador/update`, objeto , {headers: this.headers});
  }
  listarTrabajadores( ){
    return this.http.get( `${environment.url}trabajador/`);
  }

  crearProveedor( objeto ){    
    return this.http.post( `${environment.url}proveedor/create`, objeto , {headers: this.headers});
  }
  obtenerDatosByIdPro( objeto ){
    return this.http.get( `${environment.url}proveedor/${objeto}` , {headers: this.headers});
  }
  actualizarProveedor( objeto ){
    return this.http.post( `${environment.url}proveedor/update`, objeto , {headers: this.headers});
  }
  listarProveedores( ){
    return this.http.get( `${environment.url}proveedor/`);
  }

  crearMateriales( objeto ){
    return this.http.post( `${environment.url}material/create`, objeto , {headers: this.headers});
  }
  obtenerDatosByIdMat( objeto ){
    return this.http.get( `${environment.url}material/${objeto}` , {headers: this.headers});
  }
  actualizarMaterial( objeto ){
  return this.http.post( `${environment.url}material/update`, objeto , {headers: this.headers});
  }
  listarMateriales( ){
    return this.http.get( `${environment.url}material/`);
}

  crearObra( objeto ){
    return this.http.post( `${environment.url}obra/create`, objeto , {headers: this.headers});
  }
  listarObras( ){
    return this.http.get( `${environment.url}obra/`);
  }

  listarObrasPDF( ){
    return this.http.get( `${environment.url}obra/`)
    .pipe( map (data => {
          return data['obras'].map(
            usuario => ({
              nombreObra: usuario.nombreObra,
              identObra: usuario.identObra,
              fechaInicio: usuario.fechaInicio,
              fechaFin: usuario.fechaFin,
            })
          )
    } ));
  }

  avanceObra( objeto ){
    return this.http.post( `${environment.url}obra/create`, objeto , {headers: this.headers});
  }
  
  subirObraTemp( objeto ){
    return this.http.post( `${environment.url}obra/uploadpdf`, objeto , {headers: this.headers});
  }

}
