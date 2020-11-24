import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-registrar-avaobra',
  templateUrl: './registrar-avaobra.component.html',
  styleUrls: ['./registrar-avaobra.component.scss']
})
export class RegistrarAvaobraComponent implements OnInit {

  avanceObras: FormGroup
  minDate: any;
  fileParaSubir: any;
  uploadFileEvent: boolean;
  fechaAvance: any;
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService, private datepipe: DatePipe) { }

  ngOnInit(): void {

    this.avanceObras = this.formbuilder.group({
      identObra: new FormControl ('', Validators.required),
      fechaAvance: new FormControl ('', Validators.required),
      descripcion: new FormControl ('', Validators.required),
      foto: new FormControl ('', Validators.required),
      coords: new FormControl ('', Validators.required)
    })

    const fechaActual = new Date();
    this.minDate = {
      year: fechaActual.getFullYear(),
      month: fechaActual.getMonth() + 1,
      day: fechaActual.getDate()
    };


  }

  get f(){
    return this.avanceObras.controls;
  }


  dateToString = (date) => {
    console.log(date)
  return  `${date.year}-${date.month}-${date.day}`;
  }

  fechaavance(fechaAvance){
    let fechaavanceModify = new Date(fechaAvance.year, fechaAvance.month - 1, fechaAvance.day);
    this.fechaAvance = this.datepipe.transform(fechaavanceModify, 'yyyy-MM-dd');
    console.log(this.fechaavance)
  }

  crear(values){
    console.log("Entro aqui:");
    if( !this.avanceObras.valid ){
      console.log(this.avanceObras.value);
        this.avanceObras.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
      }

      console.log("Si se puede crear el form");
      console.log(this.avanceObras.value);

   /* const formData1 = new FormData();
    formData1.append('identObra',this.avanceObras.controls['identObra'].value );
    formData1.append('nombreObra',this.avanceObras.controls['nombreObra'].value );
    formData1.append('descripcion',this.avanceObras.controls['descripcion'].value );
    formData1.append('fechaInicio', this.fechaavance );
    formData1.append('fechaFin', this.fechafinal );
    formData1.append('regPlano', this.fileParaSubir.name );
    formData1.append('activo', this.avanceObras.controls['activo'].value );

    formData1.forEach( (elemento) => {
      console.log("Enviar al back datos", elemento );
    } );*/

    let objetoprueba = {    
      identObra: this.avanceObras.controls['identObra'].value,
      fechaAvance: this.fechaavance,
      descripcion: this.avanceObras.controls['descripcion'].value,
      foto: this.fileParaSubir.name,
      coords: this.avanceObras.controls['coords'].value ,
    }

    this.dashboardService.avanceObra( objetoprueba )
      .subscribe( (respuesta: any) => {
       console.log("Proceso exitoso", respuesta)
       this.toastr.success('¡Registro exitoso!', '');
       this.resetear();
    });

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
      this.avanceObras.setErrors({'invalid': true});

    } else {
      this.uploadFileEvent = false;
    }
  }

  resetear(){
    this.avanceObras.reset();
    this.avanceObras.markAsUntouched();
    this.router.navigate(['/avance-obra']);
  }

}
