import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {

  COUNTRIES: any[] = [
    {
      nombre: 'Nombre',
      apellido: 'apellido',
      correo: 'correo@getMaxListeners.com',
    },
    {
      nombre: 'Nombre',
      apellido: 'apellido',
      correo: 'correo@getMaxListeners.com',
    },
    {
      nombre: 'Nombre',
      apellido: 'apellido',
      correo: 'correo@getMaxListeners.com',
    },
    {
      nombre: 'Nombre',
      apellido: 'apellido',
      correo: 'correo@getMaxListeners.com',
    },
    {
      nombre: 'Nombre',
      apellido: 'apellido',
      correo: 'correo@getMaxListeners.com',
    },
    {
      nombre: 'Nombre',
      apellido: 'apellido',
      correo: 'correo@getMaxListeners.com',
    }
  ];


  page = 1;
  pageSize = 5;
  collectionSize = this.COUNTRIES.length;
  countries: any[];
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.refreshCountries();
  }

  refreshCountries() {
    this.countries = this.COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(id) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.escenario = 'proveedores';
    modalRef.componentInstance.id = id;
  }

}
