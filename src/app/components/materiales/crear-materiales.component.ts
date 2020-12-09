import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-crear-materiales',
  templateUrl: './crear-materiales.component.html',
  styleUrls: ['./crear-materiales.component.scss']
})
export class crearMaterialesComponent implements OnInit {
  objListaProveedor: any[] = [];

  crearMateriales: FormGroup
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService) { 
      this.dashboardService.getProveedor()
      .subscribe( (respuesta: any) => {  
        console.log(respuesta)
        this.objListaProveedor = respuesta.proveedores
        console.log(respuesta.proveedores) 
      });
    }

  ngOnInit(): void {

    this.crearMateriales = this.formbuilder.group({
      codigo: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      referencia: new FormControl ('', Validators.required),
      unidadMedida: new FormControl ('', Validators.required),
      precio: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      cantidad: new FormControl ('', [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]),
      proveedor: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
    })
  }

  get f(){
    return this.crearMateriales.controls;
  }

  crear(values){

    if( !this.crearMateriales.valid ){
        this.crearMateriales.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    this.dashboardService.crearMateriales( this.crearMateriales.value )
    .subscribe( (respuesta: any) => {
      console.log("Proceso exitoso", respuesta)
      this.toastr.success('¡Registro exitoso!', '');
      this.resetear();
        });

  }

  

  resetear(){
    this.crearMateriales.reset();
    this.crearMateriales.markAsUntouched();
    this.router.navigate(['/materiales']);
  }
  
}
