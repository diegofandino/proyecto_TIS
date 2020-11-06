import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-trabajadores',
  templateUrl: './crear-trabajadores.component.html',
  styleUrls: ['./crear-trabajadores.component.scss']
})
export class CrearTrabajadoresComponent implements OnInit {

  crearTrabajadores: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.crearTrabajadores = this.formbuilder.group({
      documento: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl ('', Validators.required),
      apellido: new FormControl ('', Validators.required),
      genero: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      direccion: new FormControl ('', Validators.required),
      cargo: new FormControl ('', Validators.required),
      obras: new FormControl (''),
      estado: new FormControl ('', Validators.required)
    })

  }

  get f(){
    return this.crearTrabajadores.controls;
  }

  crear(values){

    if( !this.crearTrabajadores.valid ){
        this.crearTrabajadores.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(values);
  }

  resetear(){
    this.crearTrabajadores.reset();
    this.crearTrabajadores.markAsUntouched();
    this.router.navigate(['/trabajadores']);
  }

}
