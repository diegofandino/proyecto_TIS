import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'FronTIS';
  openSidebar: boolean;
  constructor(private dashboardService: DashboardService, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {

    if(!this.authService.estaAutenticado()){
      this.route.navigate(['../login']);
    }

    this.dashboardService.openSidebarSubject.subscribe( (respuesta) => {
      this.openSidebar = respuesta;
    }); 

  }

}
