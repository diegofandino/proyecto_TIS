import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-crear-trabajadores',
  templateUrl: './crear-trabajadores.component.html',
  styleUrls: ['./crear-trabajadores.component.scss']
})
export class CrearTrabajadoresComponent implements OnInit {

  crearTrabajadores: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService) { }

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
      obra: new FormControl (''),
      activo: new FormControl ('', Validators.required)
    })

  }

  get f(){
    return this.crearTrabajadores.controls;
  }

  crear(values){

    if( !this.crearTrabajadores.valid ){
        this.crearTrabajadores.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    this.dashboardService.crearTrabajador( this.crearTrabajadores.value )
    .subscribe( (respuesta: any) => {
      console.log("Proceso exitoso", respuesta)
      this.toastr.success('¡Registro exitoso!', '');
      this.resetear();
        });
  }

  resetear(){
    this.crearTrabajadores.reset();
    this.crearTrabajadores.markAsUntouched();
    this.router.navigate(['/trabajadores']);
  }

}
