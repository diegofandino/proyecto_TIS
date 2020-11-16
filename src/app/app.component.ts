import { Component, Input } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'FronTIS';
  openSidebar: boolean;
  usuarioAuth: boolean = false;
  constructor(private dashboardService: DashboardService){
  }

  ngOnInit(): void {

    this.usuarioAuth = false;

    this.dashboardService.openSidebarSubject.subscribe( (respuesta) => {
      this.openSidebar = respuesta;
    });    
  }
}
