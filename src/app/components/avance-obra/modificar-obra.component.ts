import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-obra',
  templateUrl: './modificar-obra.component.html',
  styleUrls: ['./modificar-obra.component.scss']
})
export class ModificarObraComponent implements OnInit {
  
  modificarObra: FormGroup;
  fileParaSubir: any;
  uploadFileEvent: boolean;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.modificarObra = this.formbuilder.group({
      codigo: new FormControl ('', Validators.required),
      identObra: new FormControl ('', Validators.required),
      nombreObra: new FormControl ('', Validators.required),
      descripcion: new FormControl ('', Validators.required),
      fechaInicio: new FormControl ('', Validators.required),
      fechaFin: new FormControl ('', Validators.required),
      regPlano: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
    })

    this.activatedRoute.params
        .subscribe( params => {
            console.log("obra", params['id']);
        } );


  }

  modificar(values){

    if( !this.modificarObra.valid ){
        this.modificarObra.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(this.modificarObra.value);

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
