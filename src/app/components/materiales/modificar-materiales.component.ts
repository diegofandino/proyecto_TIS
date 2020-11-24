import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-modificar-materiales',
  templateUrl: './modificar-materiales.component.html',
  styleUrls: ['./modificar-materiales.component.scss']
})
export class ModificarMaterialesComponent implements OnInit {

  modificarMateriales: FormGroup;
  codigoMaterial: String;
  idModificar: String;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService, private toastr: ToastrService) { }
  
    ngOnInit(): void {
    this.modificarMateriales = this.formbuilder.group({
      codigo: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      referencia: new FormControl ('', Validators.required),
      precio: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      cantidad: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      //proveedor: new FormControl (''),
      activo: new FormControl ('', Validators.required)
    })

    this.activatedRoute.params
        .subscribe(async params => {
            this.codigoMaterial = await params['codigo'];
            this.getData(this.codigoMaterial);
            //console.log("material", params['id']);
        } );
  }

  async getData(id){
    
    const data = await this.dashboardService.obtenerDatosByIdMat(id).toPromise();
    console.log(data);

    this.modificarMateriales.setValue({
      codigo: data['material'].codigo,
      referencia: data['material'].referencia,
      precio: data['material'].precio,
      cantidad: data['material'].cantidad,
      //proveedor
      activo: data['material'].activo,
      
    });

    this.idModificar = data['material']._id;
    
  }

  modificar(values){

    if( !this.modificarMateriales.valid ){
        this.modificarMateriales.markAllAsTouched();
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    Object.assign(this.modificarMateriales.value , {'_id': this.idModificar});
    console.log("Revisar", this.modificarMateriales.value);

    this.dashboardService.actualizarMaterial(this.modificarMateriales.value)
        .subscribe( (respuesta: any) => {
          this.toastr.success('!Modificación exitosa!', '');
          this.router.navigate(['/materiales']);
        } );

  }

  resetear(){
    this.modificarMateriales.reset();
    this.modificarMateriales.markAsUntouched();
    this.router.navigate(['/materiales']);
  }

}
