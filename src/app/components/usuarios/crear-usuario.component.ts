import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  crearUsuarios: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.crearUsuarios = this.formbuilder.group({
      nombres: new FormControl ('', Validators.required),
      apellidos: new FormControl ('', Validators.required),
      genero: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      correo: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      cargo: new FormControl ('', Validators.required),
      rol: new FormControl ('', Validators.required)
    })

  }

  get f(){
    return this.crearUsuarios.controls;
  }

  crear(values){

    if( !this.crearUsuarios.valid ){
        this.crearUsuarios.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(values);
  }

  resetear(){
    this.crearUsuarios.reset();
    this.crearUsuarios.markAsUntouched();
    this.router.navigate(['/usuarios']);
  }

}
