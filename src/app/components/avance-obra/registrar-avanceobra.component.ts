/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-registrar-avanceobra',
  templateUrl: './registrar-avanceobra.component.html',
  styleUrls: ['./registrar-avanceobra.component.scss']
})
export class RegistrarAvanceobraComponent implements OnInit {

  registrarAvanceObra: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registrarAvanceObra = this.formbuilder.group({
      identObra: new FormControl ('', Validators.required),
      fechaAvance: new FormControl ('', Validators.required),
      descripcion: new FormControl ('', Validators.required),
      foto: new FormControl ('', Validators.required),
      coords: new FormControl ('', Validators.required)
    })
  }

  get f(){
    return this.registrarAvanceObra.controls;
  }

  crear(values){

    if( !this.registrarAvanceObra.valid ){
        this.registrarAvanceObra.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    this.dashboardService.registrarAvanceObra( this.registrarAvanceObra.value )
    .subscribe( (respuesta: any) => {
      console.log("Proceso exitoso", respuesta)
      this.toastr.success('¡Registro exitoso!', '');
      this.resetear();
        });
  }

  resetear(){
    this.registrarAvanceObra.reset();
    this.registrarAvanceObra.markAsUntouched();
    this.router.navigate(['/registrar-avanceobra']);
  }

}*/
