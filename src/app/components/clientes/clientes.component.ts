import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Clientes } from 'src/app/models/clientes.models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  
  page = 1;
  pageSize = 5;
  clientesLista: Clientes[] = [];
  collectionSize = this.clientesLista.length;
  clientes: any[];
  constructor(private modalService: NgbModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    
    this.dashboardService.listarClientes()
    .subscribe( (respuesta: any) => {
      console.log(respuesta);
      this.clientesLista = respuesta.clientes;
    } );
    
    this.refrescarClientes();
  }

  refrescarClientes() {
    this.clientes = this.clientesLista
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(id) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.escenario = 'clientes';
    modalRef.componentInstance.id = id;
  }

}
