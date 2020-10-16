import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
