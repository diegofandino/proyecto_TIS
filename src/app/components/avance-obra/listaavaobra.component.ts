import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvanceObras} from 'src/app/models/avanceobras.models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-listaavaobra',
  templateUrl: './listaavaobra.component.html',
  styleUrls: ['./listaavaobra.component.scss']
})
export class ListaavaobraComponent implements OnInit {
  url: string;
  page = 1;
  pageSize = 5;
  avanceobrasLista: AvanceObras[] = [];
  collectionSize = this.avanceobrasLista.length;
  countries: any[];
  constructor(private modalService: NgbModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.url = (environment.url).slice(0, -1);
    this.dashboardService.listarAvanceObras()
    .subscribe( (respuesta: any) => {
      console.log(respuesta);
      this.avanceobrasLista = respuesta.avanceObras;
    } );

    this.refrescarAvanceObras();
  }

  refrescarAvanceObras() {
    this.countries = this.avanceobrasLista
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(id) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.escenario = 'avanceobras';
    modalRef.componentInstance.id = id;
  }

}
