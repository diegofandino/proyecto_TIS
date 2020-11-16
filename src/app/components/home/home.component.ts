import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'FronTIS';
  openSidebar: boolean;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {


    this.dashboardService.openSidebarSubject.subscribe( (respuesta) => {
      this.openSidebar = respuesta;
    }); 

  }

}
