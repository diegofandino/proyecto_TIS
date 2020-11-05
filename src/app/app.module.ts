import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ModalComponent } from './components/modal/modal.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario.component';
import { ModificarUsuarioComponent } from './components/usuarios/modificar-usuario.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { CrearTrabajadoresComponent } from './components/trabajadores/crear-trabajadores.component';
import { ModificarTrabajadoresComponent } from './components/trabajadores/modificar-trabajadores.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ModificarClienteComponent } from './components/clientes/modificar-cliente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { CrearProveedoresComponent } from './components/proveedores/crear-proveedores.component';
import { ModificarProveedoresComponent } from './components/proveedores/modificar-proveedores.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ContenidoComponent,
    UsuariosComponent,
    ModalComponent,
    CrearUsuarioComponent,
    ModificarUsuarioComponent,
    TrabajadoresComponent,
    CrearTrabajadoresComponent,
    ModificarTrabajadoresComponent,
    ClientesComponent,
    ModificarClienteComponent,
    CrearClienteComponent,
    ProveedoresComponent,
    CrearProveedoresComponent,
    ModificarProveedoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
