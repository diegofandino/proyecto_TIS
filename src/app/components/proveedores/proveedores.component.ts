import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proveedores } from 'src/app/models/proveedores.models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  page = 1;
  pageSize = 5;
  proveedoresLista: Proveedores[] = [];
  collectionSize = this.proveedoresLista.length;
  proveedores: any[];
  constructor(private modalService: NgbModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.listarProveedores()
    .subscribe( (respuesta: any) => {
      this.proveedoresLista = respuesta.proveedores;
    } );
    
    this.refreshProveedores();
  }

  refreshProveedores() {
    this.proveedores = this.proveedoresLista
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(id) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.escenario = 'proveedores';
    modalRef.componentInstance.id = id;
  }

}
