import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-crear-obra',
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.scss']
})
export class CrearObraComponent implements OnInit {
  crearObras: FormGroup
  minDate: any;
  fileParaSubir: any;
  uploadFileEvent: boolean;
  fechainicial: any;
  fechafinal: any;
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService, private datepipe: DatePipe) { }

  ngOnInit(): void {

    this.crearObras = this.formbuilder.group({
      codigo: new FormControl ('', Validators.required),
      identObra: new FormControl ('', Validators.required),
      nombreObra: new FormControl ('', Validators.required),
      descripcion: new FormControl ('', Validators.required),
      fechaInicio: new FormControl ('', Validators.required),
      fechaFin: new FormControl ('', Validators.required),
      regPlano: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
    })

    const fechaActual = new Date();
    this.minDate = {
      year: fechaActual.getFullYear(),
      month: fechaActual.getMonth() + 1,
      day: fechaActual.getDate()
    };


  }

  get f(){
    return this.crearObras.controls;
  }


  dateToString = (date) => {
    console.log(date)
  return  `${date.year}-${date.month}-${date.day}`;
  }

  fechaInicial(fechaInicio){
    let fechainicialModify = new Date(fechaInicio.year, fechaInicio.month - 1, fechaInicio.day);
    this.fechainicial = this.datepipe.transform(fechainicialModify, 'yyyy-MM-dd');
    console.log(this.fechainicial)
  }
  
  fechaFinal(fechaFinal){
    let fechainicialModify2 = new Date(fechaFinal.year, fechaFinal.month - 1, fechaFinal.day);
    this.fechafinal = this.datepipe.transform(fechainicialModify2, 'yyyy-MM-dd');
    console.log(this.fechafinal)
  }

  crear(values){

    if( !this.crearObras.valid ){
      console.log(this.crearObras.value);
        this.crearObras.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
      }

      if( this.fechafinal < this.fechainicial ){
        console.log("No debe funcionar el formulario");
        this.toastr.error('La Fecha final no debe ser menor a la Fecha inicial', '');
        this.crearObras.invalid;
        return;
      }

      console.log("Si se puede crear el form");
      console.log(this.crearObras.value);

    const formData1 = new FormData();
    formData1.append('codigo',this.crearObras.controls['codigo'].value );
    formData1.append('identObra',this.crearObras.controls['identObra'].value );
    formData1.append('nombreObra',this.crearObras.controls['nombreObra'].value );
    formData1.append('descripcion',this.crearObras.controls['descripcion'].value );
    formData1.append('fechaInicio', this.fechainicial );
    formData1.append('fechaFin', this.fechafinal );
    formData1.append('regPlano', this.fileParaSubir );
    formData1.append('activo', this.crearObras.controls['activo'].value );

    formData1.forEach( (elemento) => {
      console.log("Enviar al back datos", elemento );
    } );


    // this.dashboardService.crearUsuario( this.crearUsuarios.value )
    // .subscribe( (respuesta: any) => {
    //   console.log("Proceso exitoso", respuesta)
    //   // this.toastr.success('¡Registro exitoso!', '');
    //   this.resetear();
    //     });

  }

  fileInputChange(evento) {
    this.fileParaSubir = evento[0];
    document.querySelector('.custom-file-label').innerHTML = this.fileParaSubir.name;

    let validExts = new Array('.pdf');
    if (!evento) {
      return;
    }

    let fileExt = evento[0].name;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      this.uploadFileEvent = true;
      this.crearObras.setErrors({'invalid': true});

    } else {
      this.uploadFileEvent = false;
    }
  }

  resetear(){
    this.crearObras.reset();
    this.crearObras.markAsUntouched();
    this.router.navigate(['/avance-obra']);
  }

}
