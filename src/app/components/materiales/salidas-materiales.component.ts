import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-salidas-materiales',
  templateUrl: './salidas-materiales.component.html',
  styleUrls: ['./salidas-materiales.component.scss']
})
export class SalidasMaterialesComponent implements OnInit {
  fechainicial: any;
  minDate: any;
  objListaObras: any[] = [];
  objListaMateriales: any[] = [];

  salidaMateriales: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService,private datepipe: DatePipe) {
      this.dashboardService.getObras()
      .subscribe( (respuesta: any) => {  
        console.log(respuesta)
        this.objListaObras = respuesta.obras 
        console.log(respuesta.obras) 
      }),

      this.dashboardService.getMateriales()
      .subscribe( (respuesta: any) => {  
        console.log(respuesta)
        this.objListaMateriales = respuesta.materiales
        console.log(respuesta.materiales) 
      });
      
     }

  ngOnInit(): void {
    this.salidaMateriales = this.formbuilder.group({
      idMaterial: new FormControl ('', Validators.required),
      idObra: new FormControl ('', Validators.required),
      fecha: new FormControl ('', Validators.required),
      cantidad: new FormControl ('', Validators.required),
    })

    const fechaActual = new Date();
    this.minDate = {
      year: fechaActual.getFullYear(),
      month: fechaActual.getMonth() + 1,
      day: fechaActual.getDate()
    };
  }

  get f(){
    return this.salidaMateriales.controls;
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

    if( !this.salidaMateriales.valid ){
        this.salidaMateriales.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    this.dashboardService.salidaMateriales( this.salidaMateriales.value )
    .subscribe( (respuesta: any) => {
      console.log("Proceso exitoso", respuesta)
      this.toastr.success('¡Registro exitoso!', '');
      this.resetear();
        });

  }

  resetear(){
    this.salidaMateriales.reset();
    this.salidaMateriales.markAsUntouched();
    this.router.navigate(['/materiales']);
  }
  
}
