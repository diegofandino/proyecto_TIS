import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trabajadores } from 'src/app/models/trabajadores.models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent implements OnInit {

  page = 1;
  pageSize = 5;
  trabajadoresLista: Trabajadores[] = [];
  collectionSize = this.trabajadoresLista.length;
  trabajadores: any[];
  constructor(private modalService: NgbModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    
    this.dashboardService.listarTrabajadores()
    .subscribe( (respuesta: any) => {
      console.log(respuesta);
      this.trabajadoresLista = respuesta.trabajadores;
    } );
    
    this.refrescarTrabajadores();
  }

  refrescarTrabajadores() {
    this.trabajadores = this.trabajadoresLista
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(id) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.escenario = 'trabajadores';
    modalRef.componentInstance.id = id;
  }

}
