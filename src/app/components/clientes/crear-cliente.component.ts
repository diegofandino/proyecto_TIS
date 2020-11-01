import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {

  crearClientes: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    
    this.crearClientes = this.formbuilder.group({
      nombres: new FormControl ('', Validators.required),
      apellidos: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      correo: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      obras: new FormControl ('', Validators.required),
    })

  }

  get f(){
    return this.crearClientes.controls;
  }

  crear(values){

    if( !this.crearClientes.valid ){
        this.crearClientes.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(this.crearClientes.value);
  }

  resetear(){
    this.crearClientes.reset();
    this.crearClientes.markAsUntouched();
    this.router.navigate(['/clientes']);
  }

}
