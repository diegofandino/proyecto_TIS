import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-modificar-trabajadores',
  templateUrl: './modificar-trabajadores.component.html',
  styleUrls: ['./modificar-trabajadores.component.scss']
})
export class ModificarTrabajadoresComponent implements OnInit {

  modificarTrabajadores: FormGroup;
  documentoTrabajador: String;
  idModificar: String;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService, private toastr: ToastrService) { }
  
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
      estado: new FormControl ('', Validators.required)
    })

    this.activatedRoute.params
        .subscribe(async params => {
            this.documentoTrabajador = await params['documento'];
            this.getData(this.documentoTrabajador);
            //console.log("trabajador", params['id']);
        } );
  }

  async getData(id){
    
    const data = await this.dashboardService.obtenerDatosByIdTra(id).toPromise();
    console.log(data);

    this.modificarTrabajadores.setValue({
      documento: data['trabajador'].documento,
      nombre: data['trabajador'].nombre,
      apellido: data['trabajador'].apellido,
      genero: data['trabajador'].genero,
      telefono: data['trabajador'].genero,
      email: data['trabajador'].email,
      direccion: data['trabajador'].direccion,
      cargo: data['trabajador'].cargo,
      //obras: data['trabajador'].obras,
      estado: data['trabajador'].estado,
      
    });

    this.idModificar = data['trabajador']._id;
    
  }

  modificar(values){

    if( !this.modificarTrabajadores.valid ){
        this.modificarTrabajadores.markAllAsTouched();
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    Object.assign(this.modificarTrabajadores.value , {'_id': this.idModificar});
    console.log("Revisar", this.modificarTrabajadores.value);

    this.dashboardService.actualizarTrabajador(this.modificarTrabajadores.value)
        .subscribe( (respuesta: any) => {
          this.toastr.success('!Modificación exitosa!', '');
          this.router.navigate(['/trabajadores']);
        } );

  }

  resetear(){
    this.modificarTrabajadores.reset();
    this.modificarTrabajadores.markAsUntouched();
    this.router.navigate(['/trabajadores']);
  }

}
