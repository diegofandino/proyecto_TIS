import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
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

            let doc = new jsPDF('l', 'pt');
            var col = ['Nombre', 'Apellido', 'Documento', 'Teléfono ','Correo electrónico'];
            var rows = [];

            data.forEach(element => {      
              var temp = [element.nombre,element.apellido,element.documento,element.email,element.telefono];
              rows.push(temp);
      
          });  
            doc.autoTable(col, rows);
            doc.save('prueba.pdf');

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
