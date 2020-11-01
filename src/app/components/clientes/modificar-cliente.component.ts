import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss']
})
export class ModificarClienteComponent implements OnInit {

  modificarClientes: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.modificarClientes = this.formbuilder.group({
      nombres: new FormControl ('', Validators.required),
      apellidos: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      correo: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      obras: new FormControl ('', Validators.required),
    })

    this.activatedRoute.params
        .subscribe( params => {
            console.log("cliente", params['id']);
        } );

  }

  modificar(values){

    if( !this.modificarClientes.valid ){
        this.modificarClientes.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        return;
    }

    console.log(values);
  }

  resetear(){
    this.modificarClientes.reset();
    this.modificarClientes.markAsUntouched();
    this.router.navigate(['/clientes']);
  }

}
