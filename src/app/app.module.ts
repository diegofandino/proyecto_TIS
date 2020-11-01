import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


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
import { ClientesComponent } from './components/clientes/clientes.component';
import { ModificarClienteComponent } from './components/clientes/modificar-cliente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente.component';
import { AvanceObraComponent } from './components/avance-obra/avance-obra.component';
import { CrearObraComponent } from './components/avance-obra/crear-obra.component';
import { ModificarObraComponent } from './components/avance-obra/modificar-obra.component';

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
    ClientesComponent,
    ModificarClienteComponent,
    CrearClienteComponent,
    AvanceObraComponent,
    CrearObraComponent,
    ModificarObraComponent
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
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
