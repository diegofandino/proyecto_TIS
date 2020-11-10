import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() escenario: any; 
  @Input() id: any; 
  constructor(public activeModal: NgbActiveModal, private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  eliminarRegistro(){

    switch (this.escenario) {
      case 'usuarios':
        this.dashboardService.eliminarUsuario(this.id)
            .subscribe( (respuesta: any) => {
              console.log(respuesta);
            } )      
        this.activeModal.close();
        break;
      case 'clientes':
        console.log('Se elimina el cliente', this.id);
        this.activeModal.close();
        break;
      case 'obras':
        console.log('Se elimina la obra', this.id);
        this.activeModal.close();
        break;
    
    }

  }

}
