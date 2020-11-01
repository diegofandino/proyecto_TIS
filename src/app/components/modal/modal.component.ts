import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() escenario: any; 
  @Input() id: any; 
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  eliminarRegistro(){

    switch (this.escenario) {
      case 'usuarios':
        console.log('Se elimina el usuario', this.id);
        this.activeModal.close();
        break;
      case 'clientes':
        console.log('Se elimina el cliente', this.id);
        this.activeModal.close();
        break;
    
    }

  }

}
