import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-registrar-avaobra',
  templateUrl: './registrar-avaobra.component.html',
  styleUrls: ['./registrar-avaobra.component.scss']
})
export class RegistrarAvaobraComponent implements OnInit {
  title = 'geolocation';
  public latitude;
  public longitude;
  public fotos;
  
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

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
  fechaAvance: any;
  constructor(private formbuilder: FormBuilder, private router: Router, private dashboardService: DashboardService,
    private toastr: ToastrService, private datepipe: DatePipe,private renderer: Renderer2,public locationService: LocationService) { }

  ngOnInit(): void {
    this.startCamera();
    let location = this.getLocation();

    this.avanceObras = this.formbuilder.group({
      idObra: new FormControl ('', Validators.required),
      fechaAvance: new FormControl ('', Validators.required),
      descripcion: new FormControl ('', Validators.required),
      foto: new FormControl (['']),
      coords: new FormControl ('')
    })

    const fechaActual = new Date();
    this.minDate = {
      year: fechaActual.getFullYear(),
      month: fechaActual.getMonth() + 1,
      day: fechaActual.getDate()
    };


  }

  get f(){
    return this.avanceObras.controls;
  }


  dateToString = (date) => {
    console.log(date)
  return  `${date.year}-${date.month}-${date.day}`;
  }

  fechaavance(fechaAvance){
    let fechaavanceModify = new Date(fechaAvance.year, fechaAvance.month - 1, fechaAvance.day);
    this.fechaAvance = this.datepipe.transform(fechaavanceModify, 'yyyy-MM-dd');
    console.log(this.fechaavance)
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

      console.log("Si se puede crear el form");
      console.log(this.avanceObras.value);

   const formData1 = new FormData();
    formData1.append('idObra',this.avanceObras.controls['idObra'].value );
    formData1.append('fechaAvance', this.fechaAvance);
    formData1.append('descripcion',this.avanceObras.controls['descripcion'].value );
    formData1.append('descripcion',this.avanceObras.controls['descripcion'].value );

    formData1.forEach( (elemento) => {
      console.log("Enviar al back datos", elemento );
    } );

    let objetoprueba = {    
      idObra: this.avanceObras.controls['idObra'].value,
      fechaAvance: this.fechaavance,
      descripcion: this.avanceObras.controls['descripcion'].value,
      foto: this.avanceObras.controls['foto'].value ,
      coords: this.avanceObras.controls['coords'].value ,
    }

    this.dashboardService.avanceObra( objetoprueba )
      .subscribe( (respuesta: any) => {
       console.log("Proceso exitoso", respuesta)
       this.toastr.success('¡Registro exitoso!', '');
       this.resetear();
    });

  }

  onFileSelect(event) {
    console.log("si pasa");
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avanceObras.get('foto').setValue(file);
    }
  }
  
  getLocation() {
    this.locationService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;
    });
  }

  startCamera() {
      if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
          navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
      } else {
          alert('Sorry, camera not available.');
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
      //var data = this.canvas.nativeElement.toDataURL('image/png').replace("image/png", "image/octet-stream");
      //var data = this.canvas.nativeElement;
      //data.download = 'myOtherFilename.png';
      //window.location.href = data;
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
