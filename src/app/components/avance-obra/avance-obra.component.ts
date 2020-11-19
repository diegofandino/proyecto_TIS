import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Obras } from 'src/app/models/obras.models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-avance-obra',
  templateUrl: './avance-obra.component.html',
  styleUrls: ['./avance-obra.component.scss']
})
export class AvanceObraComponent implements OnInit {
  
  page = 1;
  pageSize = 5;
  obrasLista: Obras[] = [];
  collectionSize = this.obrasLista.length;
  countries: any[];
  constructor(private modalService: NgbModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {

    this.dashboardService.listarObras()
    .subscribe( (respuesta: any) => {
      console.log(respuesta);
      this.obrasLista = respuesta.obras;
    } );

    this.refrescarObras();
  }

  refrescarObras() {
    this.countries = this.obrasLista
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(id) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.escenario = 'obras';
    modalRef.componentInstance.id = id;
  }

}
