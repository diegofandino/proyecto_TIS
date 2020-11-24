import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  arrayUsuarios: any[];
  constructor(private dashboardService: DashboardService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  generatePDF( opcion ){
    switch (opcion) {
      case 'usuario':
          console.log('usuario');
          this.dashboardService.listarUsuariosPDF().subscribe( (data) => {

            console.log(data);
          }); 

        break;
      case 'clientes':
          console.log('clientes');
        break;
      case 'obras':
          console.log('obras');
        break;
    }
  }

}
