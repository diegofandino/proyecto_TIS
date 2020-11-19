import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss']
})
export class CrearClienteComponent implements OnInit {

  crearClientes: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.crearClientes = this.formbuilder.group({
      tipo: new FormControl ('', Validators.required),
      identificacion: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      direccion: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
    })

  }

  get f(){
    return this.crearClientes.controls;
  }

  crear(values){

    if( !this.crearClientes.valid ){
        this.crearClientes.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    this.dashboardService.crearCliente( this.crearClientes.value )
    .subscribe( (respuesta: any) => {
      console.log("Proceso exitoso", respuesta)
      this.toastr.success('¡Registro exitoso!', '');
      this.resetear();
        });
  }

  resetear(){
    this.crearClientes.reset();
    this.crearClientes.markAsUntouched();
    this.router.navigate(['/clientes']);
  }

}
