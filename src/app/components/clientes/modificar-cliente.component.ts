import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.scss']
})
export class ModificarClienteComponent implements OnInit {

  modificarClientes: FormGroup;
  documentoCliente: String;
  idModificarCli: String;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService, private toastr: ToastrService) { }
  
    ngOnInit(): void {
    this.modificarClientes = this.formbuilder.group({
      tipo: new FormControl ('', Validators.required),
      identificacion: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      nombre: new FormControl ('', Validators.required),
      telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
      email: new FormControl ('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      direccion: new FormControl ('', Validators.required),
      activo: new FormControl ('', Validators.required)
    });

    this.activatedRoute.params
        .subscribe(async params => {
            this.documentoCliente = await params['identificacion'];
            this.getData(this.documentoCliente);
            //console.log("cliente", params['id']);
        } );
  }

  async getData(id){
    
    const data = await this.dashboardService.obtenerDatosByIdCli(id).toPromise();
    console.log(data);

    this.modificarClientes.setValue({
      tipo: data['cliente'].tipo,
      identificacion: data['cliente'].identificacion,
      nombre: data['cliente'].nombre,
      telefono: data['cliente'].telefono,
      email: data['cliente'].email,
      direccion: data['cliente'].direccion,
      activo: data['cliente'].activo
      
      
    });

    this.idModificarCli = data['cliente']._id;
    
  }

  modificar(values){

    if( !this.modificarClientes.valid ){
        this.modificarClientes.markAllAsTouched();
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    Object.assign(this.modificarClientes.value , {'_id': this.idModificarCli});
    console.log("Revisar", this.modificarClientes.value);

    this.dashboardService.actualizarCliente(this.modificarClientes.value)
        .subscribe( (respuesta: any) => {
          this.toastr.success('!Modificación exitosa!', '');
          this.router.navigate(['/clientes']);
        } );
  }

  resetear(){
    this.modificarClientes.reset();
    this.modificarClientes.markAsUntouched();
    this.router.navigate(['/clientes']);
  }

}
