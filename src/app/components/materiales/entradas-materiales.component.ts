import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entradas-materiales',
  templateUrl: './entradas-materiales.component.html',
  styleUrls: ['./entradas-materiales.component.scss']
})
export class EntradasMaterialesComponent implements OnInit {
  fechainicial: any;
  minDate: any;
  objListaMateriales: any[] = [];
  objListaProveedor: any[] = [];
  

  entradaMateriales: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService,private datepipe: DatePipe) {
      this.dashboardService.getMateriales()
      .subscribe( (respuesta: any) => {  
        console.log(respuesta)
        this.objListaMateriales = respuesta.materiales 
        console.log(respuesta.materiales) 
      }),
      this.dashboardService.getProveedor()
      .subscribe( (respuesta: any) => {  
        console.log(respuesta)
        this.objListaProveedor = respuesta.proveedores
        console.log(respuesta.proveedores) 
      });
     }

  ngOnInit(): void {
    
    this.entradaMateriales = this.formbuilder.group({
      idMaterial: new FormControl ('', Validators.required),
      idProveedor: new FormControl ('', Validators.required),
      fecha: new FormControl ('', Validators.required),
      cantidad: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')])
    })

    const fechaActual = new Date();
    this.minDate = {
      year: fechaActual.getFullYear(),
      month: fechaActual.getMonth() + 1,
      day: fechaActual.getDate()
    };

  }

    get f(){
    return this.entradaMateriales.controls;
  }

  dateToString = (date) => {
    console.log(date)
  return  `${date.year}-${date.month}-${date.day}`;
  }

  fechaInicial(fecha){
    let fechainicialModify = new Date(fecha.year, fecha.month - 1, fecha.day);
    this.fechainicial = this.datepipe.transform(fechainicialModify, 'yyyy-MM-dd');
    console.log(this.fechainicial)
  }

  crear(values){

    if( !this.entradaMateriales.valid ){
        this.entradaMateriales.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    this.dashboardService.entradaMateriales( this.entradaMateriales.value )
    .subscribe( (respuesta: any) => {
      console.log("Proceso exitoso", respuesta)
      this.toastr.success('¡Registro exitoso!', '');
      this.resetear();
        });

  }

  resetear(){
    this.entradaMateriales.reset();
    this.entradaMateriales.markAsUntouched();
    this.router.navigate(['/materiales']);
  }

}
