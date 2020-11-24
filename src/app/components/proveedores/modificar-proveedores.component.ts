import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-modificar-proveedores',
  templateUrl: './modificar-proveedores.component.html',
  styleUrls: ['./modificar-proveedores.component.scss']
})
export class ModificarProveedoresComponent implements OnInit {

  modificarProveedores: FormGroup;
  identificacionPro: String;
  idModificar: String;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.modificarProveedores = this.formbuilder.group({
      tipo: new FormControl ('', Validators.required),
      identificacion: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl ('', Validators.required),
      repreLegal: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      direccion: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
    })

    this.activatedRoute.params
        .subscribe(async params => {
            this.identificacionPro = await params['identificacion'];
            this.getData(this.identificacionPro);
            //console.log("trabajador", params['id']);
        } );

  }

  async getData(id){
    
    const data = await this.dashboardService.obtenerDatosByIdPro(id).toPromise();
    console.log(data);

    this.modificarProveedores.setValue({
      tipo: data['proveedor'].tipo,
      identificacion: data['proveedor'].identificacion,
      nombre: data['proveedor'].nombre,
      repreLegal: data['proveedor'].repreLegal,
      telefono: data['proveedor'].telefono,
      email: data['proveedor'].email,
      direccion: data['proveedor'].direccion,
      activo: data['proveedor'].activo,
     
      
    });

    this.idModificar = data['proveedor']._id;
    
  }

  modificar(values){

    if( !this.modificarProveedores.valid ){
        this.modificarProveedores.markAllAsTouched();
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    Object.assign(this.modificarProveedores.value , {'_id': this.idModificar});
    console.log("Revisar", this.modificarProveedores.value);

    this.dashboardService.actualizarProveedor(this.modificarProveedores.value)
        .subscribe( (respuesta: any) => {
          this.toastr.success('!Modificación exitosa!', '');
          this.router.navigate(['/materiales']);
        } );

  }

  resetear(){
    this.modificarProveedores.reset();
    this.modificarProveedores.markAsUntouched();
    this.router.navigate(['/proveedores']);
  }

}
