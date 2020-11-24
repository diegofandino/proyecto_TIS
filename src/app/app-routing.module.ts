import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { UsuariosComponent } from '../app/components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from '../app/components/usuarios/crear-usuario.component';
import { ModificarUsuarioComponent } from '../app/components/usuarios/modificar-usuario.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente.component';
import { ModificarClienteComponent } from './components/clientes/modificar-cliente.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import {CrearTrabajadoresComponent} from './components/trabajadores/crear-trabajadores.component';
import { ModificarTrabajadoresComponent} from './components/trabajadores/modificar-trabajadores.component';
import { ProveedoresComponent} from './components/proveedores/proveedores.component';
import { CrearProveedoresComponent } from './components/proveedores/crear-proveedores.component';
import { ModificarProveedoresComponent } from './components/proveedores/modificar-proveedores.component';
import { AvanceObraComponent } from './components/avance-obra/avance-obra.component';
import { CrearObraComponent } from './components/avance-obra/crear-obra.component';
import { ModificarObraComponent } from './components/avance-obra/modificar-obra.component';
import { LoginComponent } from '../app/components/login/login.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MaterialesComponent} from './components/materiales/materiales.component';
import { crearMaterialesComponent } from './components/materiales/crear-materiales.component';
import { ModificarMaterialesComponent } from './components/materiales/modificar-materiales.component';
import { ReportesComponent } from '../app/components/reportes/reportes.component';






const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent ,  canActivate: [AuthGuard] , children: [
    { path: 'bienvenido', component: ContenidoComponent, canActivate: [AuthGuard] },
    { path: 'usuarios', component: UsuariosComponent , canActivate: [AuthGuard] },
    { path: 'reportes', component: ReportesComponent , canActivate: [AuthGuard] },
    { path: 'clientes', component: ClientesComponent , canActivate: [AuthGuard] },
    { path: 'trabajadores', component: TrabajadoresComponent , canActivate: [AuthGuard] },
    { path: 'proveedores', component: ProveedoresComponent , canActivate: [AuthGuard] },
    { path: 'materiales', component: MaterialesComponent , canActivate: [AuthGuard] },
    { path: 'crear-cliente', component: CrearClienteComponent , canActivate: [AuthGuard] },
    { path: 'crear-obra', component: CrearObraComponent , canActivate: [AuthGuard] },
    { path: 'avance-obra', component: AvanceObraComponent , canActivate: [AuthGuard] },
    { path: 'crear-usuario', component: CrearUsuarioComponent , canActivate: [AuthGuard] },
    { path: 'crear-trabajadores', component: CrearTrabajadoresComponent , canActivate: [AuthGuard] },
    { path: 'crear-proveedores', component: CrearProveedoresComponent , canActivate: [AuthGuard] },
    { path: 'crear-materiales', component: crearMaterialesComponent , canActivate: [AuthGuard] },
    { path: 'modificar-usuario/:email', component: ModificarUsuarioComponent , canActivate: [AuthGuard] },
    { path: 'modificar-cliente/:identificacion', component: ModificarClienteComponent , canActivate: [AuthGuard] },
    { path: 'modificar-trabajador/:documento', component: ModificarTrabajadoresComponent , canActivate: [AuthGuard] },
    { path: 'modificar-proveedor/:id', component: ModificarProveedoresComponent , canActivate: [AuthGuard] },
    { path: 'modificar-obra/:id', component: ModificarObraComponent , canActivate: [AuthGuard] }
  ]},
  { path: '**', redirectTo: '/login', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
