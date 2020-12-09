import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-registrar-avaobra',
  templateUrl: './registrar-avaobra.component.html',
  styleUrls: ['./registrar-avaobra.component.scss']
})
export class RegistrarAvaobraComponent implements OnInit {
  //Geolocalización
  title = 'geolocation';
  public latitude;
  public longitude;

  
  //Captura video
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  videoWidth = 0;
    videoHeight = 0;
    constraints = {
        video: {
            facingMode: "environment",
            width: { ideal: 4096 },
            height: { ideal: 2160 }
        }
    };

  avanceObras: FormGroup
  minDate: any;
  fileParaSubir: any;
  uploadFileEvent: boolean;
  fechainicial: any;
  datosUsuarioAut: any;
  
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService, private datepipe: DatePipe,private renderer: Renderer2,public locationService: LocationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.startCamera();
    let location = this.getLocation();

    this.avanceObras = this.formbuilder.group({
      idObra: new FormControl ('', Validators.required),
      fechaAvance: new FormControl ('', Validators.required),
      descripcion: new FormControl ('', Validators.required),
      foto: new FormControl (''),
      latitude: new FormControl (''),
      longitude: new FormControl ('')      
    })

    const fechaActual = new Date();
    this.minDate = {
      year: fechaActual.getFullYear(),
      month: fechaActual.getMonth() + 1,
      day: fechaActual.getDate()
    };

    this.datosUsuarioAut = jwt_decode(this.obtenerDatos());
    console.log("Usuario token autenticación", this.datosUsuarioAut['usuario']._id);
    
  }

  get f(){
    return this.avanceObras.controls;
  }

  obtenerDatos(){
    const data = this.authService.obtenerToken();
    return data
  }


  dateToString = (date) => {
    console.log(date)
  return  `${date.year}-${date.month}-${date.day}`;
  }

  fechaInicial(fechaAvance){
    let fechainicialModify = new Date(fechaAvance.year, fechaAvance.month - 1, fechaAvance.day);
    this.fechainicial = this.datepipe.transform(fechainicialModify, 'yyyy-MM-dd');
    console.log(this.fechainicial)
  }

  crear(values){
    console.log("Entro aqui:");
    if( !this.avanceObras.valid ){
      console.log(this.avanceObras.value);
        this.avanceObras.markAllAsTouched();
        console.log("No debe funcionar el formulario");
        this.toastr.error('Existen campos obligatorios sin diligenciar', '');
        return;
      }

      this.dashboardService.subirImgObraTemp( this.fileParaSubir )
          .subscribe( (respuesta: any) => { console.log(respuesta) } );

      console.log("Si se puede crear el form");
      console.log(this.avanceObras.value);

   const formData1 = new FormData();
    formData1.append('idObra',this.avanceObras.controls['idObra'].value );    
    formData1.append('fechaAvance', this.fechainicial);
    formData1.append('descripcion',this.avanceObras.controls['descripcion'].value );
    formData1.append('latitude',this.avanceObras.controls['latitude'].value );
    formData1.append('longitude',this.avanceObras.controls['longitude'].value );
    formData1.append('usuario', this.datosUsuarioAut['usuario']._id );

    //console.log('Info User: ' + this.datosUsuarioAut['usuario']._id);

    formData1.forEach( (elemento) => {
      console.log("Enviar al back datos", elemento );
    } );

    this.dashboardService.avanceObra( formData1 )
      .subscribe( (respuesta: any) => {
       console.log("Proceso exitoso", respuesta)
       this.toastr.success('¡Registro exitoso!', '');
       this.resetear();
    });

  }
  //Subir archivo
  fileInputChange(evento) {
    this.fileParaSubir = evento[0];
    document.querySelector('.custom-file-label').innerHTML = this.fileParaSubir.name;

    let validExts = new Array('.png');
    if (!evento) {
      return;
    }

    let fileExt = evento[0].name;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      this.uploadFileEvent = true;
      this.avanceObras.setErrors({'invalid': true});

    } else {
      this.uploadFileEvent = false;
    }
  }

  getLocation() {
    this.locationService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
    });
  }

  //Camara y captura
  startCamera() {
      if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
          navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
      } else {
          alert('La camara no esta habilitada');
      }
  }

  attachVideo(stream) {
      this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
      this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
          this.videoHeight = this.videoElement.nativeElement.videoHeight;
          this.videoWidth = this.videoElement.nativeElement.videoWidth;
      });
  }

  capture() {
      this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
      this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
      this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
      var data = this.canvas.nativeElement.toDataURL('image/png').replace("image/png", "image/octet-stream");
    
      //data.download = 'myOtherFilename.png';
      window.location.href = data;
      //var data = this.canvas.nativeElement.toDataURL('image/png');
      //this.fotos = data;
      //this.avanceObras.get('foto').setValue(data);
      //window.open(data);
  }

  handleError(error) {
      console.log('Error: ', error);
  }

  resetear(){
    this.avanceObras.reset();
    this.avanceObras.markAsUntouched();
    this.router.navigate(['/avance-obra']);
  }



}
