import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { Usuarios } from '../../models/usuarios.models';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})



export class UsuariosComponent implements OnInit {
  
  page = 1;
  pageSize = 5;
  usuariosLista: Usuarios[] = [];
  collectionSize = this.usuariosLista.length;
  countries: any[];
  constructor(private modalService: NgbModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.refreshCountries();

    this.dashboardService.listarUsuarios()
        .subscribe( (respuesta: any) => {
          this.usuariosLista = respuesta.usuarios;
        } );

  }

  refreshCountries() {
    this.countries = this.usuariosLista
      .map((usuario, i) => ({numeral: i + 1, ...usuario}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(id) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.escenario = 'usuarios';
    modalRef.componentInstance.id = id;
  }

}
