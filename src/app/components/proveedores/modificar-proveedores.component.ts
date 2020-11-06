import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-proveedores',
  templateUrl: './modificar-proveedores.component.html',
  styleUrls: ['./modificar-proveedores.component.scss']
})
export class ModificarProveedoresComponent implements OnInit {

  modificarProveedores: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.modificarProveedores = this.formbuilder.group({
      documento: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      tipo: new FormControl ('', Validators.required),
      nombre: new FormControl ('', Validators.required),
      repreLegal: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      direccion: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
    })

    this.activatedRoute.params
        .subscribe( params => {
            console.log("proveedor", params['id']);
        } );

  }

  modificar(values){

    if( !this.modificarProveedores.valid ){
        this.modificarProveedores.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(values);
  }

  resetear(){
    this.modificarProveedores.reset();
    this.modificarProveedores.markAsUntouched();
    this.router.navigate(['/proveedores']);
  }

}
