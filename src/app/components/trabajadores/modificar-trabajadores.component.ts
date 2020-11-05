import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-trabajadores',
  templateUrl: './modificar-trabajadores.component.html',
  styleUrls: ['./modificar-trabajadores.component.scss']
})
export class ModificarTrabajadoresComponent implements OnInit {

  modificarTrabajadores: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.modificarTrabajadores = this.formbuilder.group({
      documento: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl ('', Validators.required),
      apellido: new FormControl ('', Validators.required),
      genero: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      direccion: new FormControl ('', Validators.required),
      cargo: new FormControl ('', Validators.required),
      obras: new FormControl (''),
      activo: new FormControl ('', Validators.required)
    })

    this.activatedRoute.params
        .subscribe( params => {
            console.log("trabajador", params['id']);
        } );

  }

  modificar(values){

    if( !this.modificarTrabajadores.valid ){
        this.modificarTrabajadores.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(values);
  }

  resetear(){
    this.modificarTrabajadores.reset();
    this.modificarTrabajadores.markAsUntouched();
    this.router.navigate(['/trabajadores']);
  }

}
