import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-entradas-materiales',
  templateUrl: './entradas-materiales.component.html',
  styleUrls: ['./entradas-materiales.component.scss']
})
export class EntradasMaterialesComponent implements OnInit {
  minDate: any;
  entradaMateriales: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.entradaMateriales = this.formbuilder.group({
      idMaterial: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      idObra: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      fecha: new FormControl ('', Validators.required),
      cantidad: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')])
    })

    const fechaActual = new Date();
    this.minDate = {
      year: fechaActual.getFullYear(),
      month: fechaActual.getMonth() + 1,
      day: fechaActual.getDate()
    };
  }

    get f(){
    return this.entradaMateriales.controls;
  }

  crear(values){

    if( !this.entradaMateriales.valid ){
        this.entradaMateriales.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    this.dashboardService.entradaMateriales( this.entradaMateriales.value )
    .subscribe( (respuesta: any) => {
      console.log("Proceso exitoso", respuesta)
      this.toastr.success('¡Registro exitoso!', '');
      this.resetear();
        });

  }

  resetear(){
    this.entradaMateriales.reset();
    this.entradaMateriales.markAsUntouched();
    this.router.navigate(['/materiales']);
  }

  

}
