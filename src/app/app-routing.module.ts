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




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent , children: [
    { path: 'bienvenido', component: ContenidoComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'trabajadores', component: TrabajadoresComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    { path: 'crear-cliente', component: CrearClienteComponent },
    { path: 'crear-obra', component: CrearObraComponent },
    { path: 'avance-obra', component: AvanceObraComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent },
    { path: 'crear-trabajadores', component: CrearTrabajadoresComponent },
    { path: 'crear-proveedores', component: CrearProveedoresComponent },
    { path: 'modificar-usuario/:email', component: ModificarUsuarioComponent },
    { path: 'modificar-cliente/:id', component: ModificarClienteComponent },
    { path: 'modificar-trabajador/:id', component: ModificarTrabajadoresComponent },
    { path: 'modificar-proveedor/:id', component: ModificarProveedoresComponent },
    { path: 'modificar-obra/:id', component: ModificarObraComponent }
  ]},
  { path: '**', redirectTo: 'login', pathMatch: 'full'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
