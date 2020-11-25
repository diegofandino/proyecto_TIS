import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import pdfMake from 'pdfmake/build/pdfmake'; 
import pdfFonts from 'pdfmake/build/vfs_fonts'; 
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  arrayUsuarios: any[];
  constructor(private dashboardService: DashboardService, private toastr: ToastrService,
    private datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  generatePDF( opcion ){
    switch (opcion) {
      case 'usuario':
          this.dashboardService.listarUsuariosPDF().subscribe( (data) => {

            let arregloTemporal: any[] = [[{text: 'Nombre', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
            {text: 'Apellido', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
            {text: 'Documento', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
            {text: 'Correo eletrónico', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
            {text: 'Teléfono', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true} ]];

            data.forEach(element => {
                let elemento = [ {text: element.nombre,  margin: [2, 2]}, {text: element.apellido ,  margin: [2, 2]},
                {text: element.documento,  margin: [2, 2]} , 
                {text: element.email, margin: [2, 2]}, {text: element.telefono, margin: [2, 2]}]
                arregloTemporal.push(elemento);
            });

            let docDefinition = {
              content: [
                {text: 'Reporte de usuarios \t\t\t', margin: [ 5, 2, 10, 20 ], style: 'header', fontSize: 20, alignment: 'center'},
                {
                  style: 'tableExample',
                  width: 'auto',
                  table: {
                    headerRows: 1,
                    widths: ['15%', '15%', '20%', '30%', '20%'],
            
                    body: arregloTemporal,
                    alignment: "center"
                  }
                },
              ],
              defaultStyle: {
                alignment: 'center',
                fontSize: 10
              }
            };

            // download the PDF
            pdfMake.createPdf(docDefinition).download('Reporte_usuarios.pdf');

          }, err => {
            this.toastr.error('Ha ocurrido un error al generar el reporte', '');
          }); 

        break;
      case 'clientes':
          
        this.dashboardService.listarClientesPDF().subscribe( (data) => {

          let arregloTemporal: any[] = [[{text: 'Nombre', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
          {text: 'Identificación', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
          {text: 'Dirección', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
          {text: 'Correo eletrónico', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
          {text: 'Teléfono', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true} ]];

          data.forEach(element => {
              let elemento = [ {text: element.nombre,  margin: [2, 2]}, {text: element.identificacion ,  margin: [2, 2]},
              {text: element.direccion,  margin: [2, 2]} , 
              {text: element.email, margin: [2, 2]}, {text: element.telefono, margin: [2, 2]}]
              arregloTemporal.push(elemento);
          });

          let docDefinition = {
            content: [
              {text: 'Reporte de clientes \t\t\t', margin: [ 5, 2, 10, 20 ], style: 'header', fontSize: 20, alignment: 'center'},
              {
                style: 'tableExample',
                width: 'auto',
                table: {
                  headerRows: 1,
                  widths: ['15%', '15%', '25%', '30%', '15%'],
          
                  body: arregloTemporal,
                  alignment: "center"
                }
              },
            ],
            defaultStyle: {
              alignment: 'center',
              fontSize: 10
            }
          };

          // download the PDF
          pdfMake.createPdf(docDefinition).download('Reporte_clientes.pdf');

        }, err => {
          this.toastr.error('Ha ocurrido un error al generar el reporte', '');
        }); 

        break;
      case 'obras':

        this.dashboardService.listarObrasPDF().subscribe( (data) => {

          let arregloTemporal: any[] = [[{text: 'Nombre Obra', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
          {text: 'Identificación Obra', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
          {text: 'Fecha inicio', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}, 
          {text: 'Fecha fin', margin: [2, 2], fillColor: '#007BFF', color: '#ffffff', bold: true}]];

          data.forEach(element => {
              let elemento = [ {text: element.nombreObra,  margin: [2, 2]}, {text: element.identObra ,  margin: [2, 2]},
              {text: this.datepipe.transform(element.fechaInicio, 'yyyy-MM-dd') ,  margin: [2, 2]} , 
              {text: this.datepipe.transform(element.fechaFin, 'yyyy-MM-dd'), margin: [2, 2]}]
              arregloTemporal.push(elemento);
          });

          let docDefinition = {
            content: [
              {text: 'Reporte de obras \t\t\t', margin: [ 5, 2, 10, 20 ], style: 'header', fontSize: 20, alignment: 'center'},
              {
                style: 'tableExample',
                width: 'auto',
                table: {
                  headerRows: 1,
                  widths: ['30%', '30%', '20%', '20%'],
          
                  body: arregloTemporal,
                  alignment: "center"
                }
              },
            ],
            defaultStyle: {
              alignment: 'center',
              fontSize: 11
            }
          };

          // download the PDF
          pdfMake.createPdf(docDefinition).download('Reporte_obras.pdf');

        }, err => {
          this.toastr.error('Ha ocurrido un error al generar el reporte', '');
        }); 
        break;
    }
  }

}
