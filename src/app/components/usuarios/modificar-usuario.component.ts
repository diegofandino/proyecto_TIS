import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  modificarUsuarios: FormGroup;
  emailUsuario: string;
  idModificar: string;
  constructor(private formbuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService, private toastr: ToastrService) { }

  ngOnInit(): void {

        this.modificarUsuarios = this.formbuilder.group({
          nombre: new FormControl ('', Validators.required),
          apellido: new FormControl ('', Validators.required),
          genero: new FormControl ('', Validators.required),
          password: new FormControl ('', Validators.required),
          documento: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
          telefono: new FormControl ('', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]),
          email: new FormControl ({value: '', disabled: true}, [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
          rol: new FormControl ('', Validators.required),
          activo: new FormControl ('', Validators.required)
        });

        this.activatedRoute.params
        .subscribe( async params => {
            this.emailUsuario = await params['email'];
            this.getData(this.emailUsuario);
        } );

  }

  async getData(id){
    const data = await this.dashboardService.obtenerDatosById(id).toPromise();

    this.modificarUsuarios.setValue({
      nombre: data['usuario'].nombre,
      apellido: data['usuario'].apellido,
      genero: data['usuario'].genero, 
      password: data['usuario'].password,
      documento:  data['usuario'].documento,
      telefono: data['usuario'].telefono,
      email: data['usuario'].email ,
      rol: data['usuario'].rol,
      activo: data['usuario'].activo
    });

    this.idModificar = data['usuario']._id;
    
  }

  modificar(values){

    if( !this.modificarUsuarios.valid ){
        this.modificarUsuarios.markAllAsTouched();
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
    }

    Object.assign(this.modificarUsuarios.value , {'_id': this.idModificar});
    console.log("Revisar", this.modificarUsuarios.value);

    this.dashboardService.actualizarUsuario(this.modificarUsuarios.value)
        .subscribe( (respuesta: any) => {
          this.toastr.success('¡Registro exitoso!', '');
          this.router.navigate(['/usuarios']);
        } );

  }

  resetear(){
    this.modificarUsuarios.reset();
    this.modificarUsuarios.markAsUntouched();
    this.router.navigate(['/usuarios']);
  }

}
