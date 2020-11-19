import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../app/utils/ngb-date-fr-parser-formatter"

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
import { AvanceObraComponent } from './components/avance-obra/avance-obra.component';
import { CrearObraComponent } from './components/avance-obra/crear-obra.component';
import { ModificarObraComponent } from './components/avance-obra/modificar-obra.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { crearMaterialesComponent } from './components/materiales/crear-materiales.component';
import { ModificarMaterialesComponent } from './components/materiales/modificar-materiales.component';

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
    ModificarProveedoresComponent,
    AvanceObraComponent,
    CrearObraComponent,
    ModificarObraComponent,
    LoginComponent,
    HomeComponent,
    MaterialesComponent,
    crearMaterialesComponent,
    ModificarMaterialesComponent
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
  providers: [DatePipe, {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}, AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
