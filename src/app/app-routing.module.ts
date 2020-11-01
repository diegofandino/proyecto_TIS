import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { UsuariosComponent } from '../app/components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from '../app/components/usuarios/crear-usuario.component';
import { ModificarUsuarioComponent } from '../app/components/usuarios/modificar-usuario.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente.component';
import { ModificarClienteComponent } from './components/clientes/modificar-cliente.component';
import { AvanceObraComponent } from './components/avance-obra/avance-obra.component';
import { CrearObraComponent } from './components/avance-obra/crear-obra.component';
import { ModificarObraComponent } from './components/avance-obra/modificar-obra.component';



const routes: Routes = [
  { path: '', component: ContenidoComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: 'crear-obra', component: CrearObraComponent },
  { path: 'avance-obra', component: AvanceObraComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'modificar-usuario/:id', component: ModificarUsuarioComponent },
  { path: 'modificar-cliente/:id', component: ModificarClienteComponent },
  { path: 'modificar-obra/:id', component: ModificarObraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
