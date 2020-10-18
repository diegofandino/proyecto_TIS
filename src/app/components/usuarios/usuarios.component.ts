import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})



export class UsuariosComponent implements OnInit {
  
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
  constructor() { }

  ngOnInit(): void {
    this.refreshCountries();
  }

  refreshCountries() {
    this.countries = this.COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
