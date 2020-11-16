import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  openSidebar: boolean;
  usuarioAutenticado: boolean;
  datosUsuarioAut: any;
  constructor(private dashboardService: DashboardService, private authService: AuthService) { }

  ngOnInit(): void {
    
    
    //datos de usuario autenticado
    this.usuarioAutenticado = this.authService.estaAutenticado();
    this.datosUsuarioAut = jwt_decode(this.obtenerDatos());
    console.log(this.datosUsuarioAut.usuario);

  }

  obtenerDatos(){
    const data = this.authService.obtenerToken();
    return data
  }

  logout(){
    this.authService.logout();
  }

  opensidebar(){

    this.dashboardService.openSidebarSubject.subscribe(
      (respuesta) => {
        this.openSidebar = respuesta;
      }
    );
    
    this.openSidebar = !this.openSidebar;
    this.dashboardService.setModalStatus(this.openSidebar);
  }
  

}
