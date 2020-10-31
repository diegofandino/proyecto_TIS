import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  crearUsuarios: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService) { }

  ngOnInit(): void {

    this.crearUsuarios = this.formbuilder.group({
      nombre: new FormControl ('', Validators.required),
      apellido: new FormControl ('', Validators.required),
      genero: new FormControl ('', Validators.required),
      password: new FormControl ('', Validators.required),
      documento: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      rol: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
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

    console.log(JSON.stringify( this.crearUsuarios.value));


    this.dashboardService.crearUsuario( this.crearUsuarios.value )
        .subscribe( (respuesta: any) => {
          console.log("Usuario registrado existoso", respuesta);
          this.resetear();
        }, err => { console.log("No se pudo realizar la petición") });

  }

  resetear(){
    this.crearUsuarios.reset();
    this.crearUsuarios.markAsUntouched();
    this.router.navigate(['/usuarios']);
  }

}
