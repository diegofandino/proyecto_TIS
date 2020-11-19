import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Materiales } from 'src/app/models/materiales.models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss']
})
export class MaterialesComponent implements OnInit {

  page = 1;
  pageSize = 5;
  materialesLista: Materiales[] = [];
  collectionSize = this.materialesLista.length;
  materiales: any[];
  constructor(private modalService: NgbModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    
    this.dashboardService.listarMateriales()
    .subscribe( (respuesta: any) => {
      console.log(respuesta);
      this.materialesLista = respuesta.materiales;
    } );
    
    this.refrescarMateriales();
  }

  refrescarMateriales() {
    this.materiales = this.materialesLista
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(id) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.escenario = 'materiales';
    modalRef.componentInstance.id = id;
  }

}
