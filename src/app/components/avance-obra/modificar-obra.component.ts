import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modificar-obra',
  templateUrl: './modificar-obra.component.html',
  styleUrls: ['./modificar-obra.component.scss']
})
export class ModificarObraComponent implements OnInit {
  
  modificarObra: FormGroup;
  fileParaSubir: any;
  uploadFileEvent: boolean;
  fechainicial: any;
  fechafinal: any;
  idModificar: any;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe, private toastr: ToastrService, private DashboardService: DashboardService) { }

  ngOnInit(): void {

    this.modificarObra = this.formbuilder.group({
      identObra: new FormControl ('', Validators.required),
      nombreObra: new FormControl ('', Validators.required),
      descripcion: new FormControl ('', Validators.required),
      fechaInicio: new FormControl ('', Validators.required),
      fechaFin: new FormControl ('', Validators.required),
      regPlano: new FormControl (''),
      activo: new FormControl ('', Validators.required)
    })

    this.activatedRoute.params
        .subscribe( params => {
            console.log("obra", params['id']);
            
            this.idModificar = params['id'];

        } );

        this.DashboardService.obtenerDatosByIdObra( this.idModificar  )
            .subscribe( (respuesta: any) => {
              console.log("Datos a modificar",respuesta);

              this.modificarObra.patchValue({
                identObra: respuesta.obra.identObra,
                nombreObra: respuesta.obra.nombreObra,
                descripcion: respuesta.obra.descripcion,
                fechaInicio: this.convertFormatoNG(respuesta.obra.fechaInicio),
                fechaFin: this.convertFormatoNG(respuesta.obra.fechaFin),
                // regPlano: respuesta.obra.regPlano,
                activo: respuesta.obra.activo
              })

            } )


  }

  convertFormatoNG(date){
    let fechaModificada = date.split('T')[0];
    console.log(fechaModificada);
    let fechaSplit = {
      year: parseInt(fechaModificada.split('-')[0]),
      month: parseInt(fechaModificada.split('-')[1]),
      day: parseInt(fechaModificada.split('-')[2]),
    }

    console.log(fechaSplit);

    return fechaSplit;
  }

  convertFormatoNorm(date){
    let fechaModify = new Date(date.year, date.month - 1, date.day);
    return this.datepipe.transform(fechaModify, 'yyyy-MM-dd');

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

  modificar(values){

    if( !this.modificarObra.valid ){
        this.modificarObra.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    if( this.fechafinal < this.fechainicial ){
      console.log("No debe funcionar el formulario");
      this.toastr.error('La Fecha final no debe ser menor a la Fecha inicial', '');
      this.modificarObra.invalid;
      return;
    }

    console.log(this.modificarObra.value);

    const formData1 = new FormData();
    formData1.append('identObra',this.modificarObra.controls['identObra'].value );
    formData1.append('nombreObra',this.modificarObra.controls['nombreObra'].value );
    formData1.append('descripcion',this.modificarObra.controls['descripcion'].value );
    formData1.append('fechaInicio', this.convertFormatoNorm(this.modificarObra.controls['fechaInicio'].value));
    formData1.append('fechaFin', this.convertFormatoNorm( this.modificarObra.controls['fechaFin'].value ));
    formData1.append('regPlano', this.fileParaSubir ? this.fileParaSubir : '' );
    formData1.append('activo', this.modificarObra.controls['activo'].value );

    formData1.forEach( (elemento) => {
      console.log("Enviar al back datos", elemento );
    } );

    this.DashboardService.actualizarObra( formData1 )
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
      this.modificarObra.setErrors({'invalid': true});

    } else {
      this.uploadFileEvent = false;
    }
  }

  resetear(){
    this.modificarObra.reset();
    this.modificarObra.markAsUntouched();
    this.router.navigate(['/avance-obra']);
  }

}
