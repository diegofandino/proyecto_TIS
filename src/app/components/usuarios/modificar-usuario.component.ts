import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  modificarUsuarios: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.modificarUsuarios = this.formbuilder.group({
      nombre: new FormControl ('', Validators.required),
      apellido: new FormControl ('', Validators.required),
      genero: new FormControl ('', Validators.required),
      password: new FormControl ('', Validators.required),
      documento: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      cargo: new FormControl ('', Validators.required),
      rol: new FormControl ('', Validators.required),
      estado: new FormControl ('', Validators.required)
    })

    this.activatedRoute.params
        .subscribe( params => {
            console.log("usuario", params['id']);
        } );

  }

  modificar(values){

    if( !this.modificarUsuarios.valid ){
        this.modificarUsuarios.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(values);
  }

  resetear(){
    this.modificarUsuarios.reset();
    this.modificarUsuarios.markAsUntouched();
    this.router.navigate(['/usuarios']);
  }

}
