import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-proveedores',
  templateUrl: './crear-proveedores.component.html',
  styleUrls: ['./crear-proveedores.component.scss']
})
export class CrearProveedoresComponent implements OnInit {

  crearProveedores: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.crearProveedores = this.formbuilder.group({
      documento: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      tipo: new FormControl ('', Validators.required),
      nombre: new FormControl ('', Validators.required),
      repreLegal: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      direccion: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
    })

  }

  get f(){
    return this.crearProveedores.controls;
  }

  crear(values){

    if( !this.crearProveedores.valid ){
        this.crearProveedores.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(values);
  }

  resetear(){
    this.crearProveedores.reset();
    this.crearProveedores.markAsUntouched();
    this.router.navigate(['/proveedores']);
  }

}
