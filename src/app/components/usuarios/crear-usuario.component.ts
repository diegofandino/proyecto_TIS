import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  crearUsuarios: FormGroup
  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    this.crearUsuarios = this.formbuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', Validators.required, Validators.maxLength(10) ,Validators.pattern('/^[0-9]+$/')],
      correo: ['', Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')],
      cargo: ['', Validators.required],
      rol: ['', Validators.required]
    })

  }

  crear(values){
    console.log(values);
  }

}
