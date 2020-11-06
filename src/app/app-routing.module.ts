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


const routes: Routes = [
  { path: '', component: ContenidoComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'trabajadores', component: TrabajadoresComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'crear-trabajadores', component: CrearTrabajadoresComponent },
  { path: 'crear-proveedores', component: CrearProveedoresComponent },
  { path: 'modificar-usuario/:id', component: ModificarUsuarioComponent },
  { path: 'modificar-cliente/:id', component: ModificarClienteComponent },
  { path: 'modificar-trabajador/:id', component: ModificarTrabajadoresComponent },
  { path: 'modificar-proveedor/:id', component: ModificarProveedoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
