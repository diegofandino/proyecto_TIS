import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  openSidebar: boolean;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    
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
