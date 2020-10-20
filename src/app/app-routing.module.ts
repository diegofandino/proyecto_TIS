import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { UsuariosComponent } from '../app/components/usuarios/usuarios.component';
import { CrearUsuarioComponent } from '../app/components/usuarios/crear-usuario.component';
import { ModificarUsuarioComponent } from '../app/components/usuarios/modificar-usuario.component';


const routes: Routes = [
  { path: '', component: ContenidoComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'modificar-usuario/:id', component: ModificarUsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
