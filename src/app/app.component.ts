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
  constructor(private dashboardService: DashboardService){
  }

  ngOnInit(): void {
    this.dashboardService.openSidebarSubject.subscribe( (respuesta) => {
      console.log(respuesta)
      this.openSidebar = respuesta;
    });    
  }
}
