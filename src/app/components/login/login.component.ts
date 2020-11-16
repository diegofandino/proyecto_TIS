import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    if(this.authService.estaAutenticado()){
      this.route.navigate(['./bienvenido']);
    }

    this.formLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      password: new FormControl('', [Validators.required])
    });

  }

  loguear(){
    this.authService.login( this.formLogin.value )
        .subscribe( (respuesta: any) => {
          console.log(respuesta);
           if( respuesta['ok'] ){
             console.log('entro')
              this.route.navigate(['./bienvenido']);
           } else {
            this.toastr.error( respuesta.mensaje , '');
           }
        } );
  }

}
