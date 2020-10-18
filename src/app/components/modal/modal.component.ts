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
    if(this.escenario == 'usuarios'){
      console.log('Se elimina el usuario', this.id);
      this.activeModal.close();
    }
  }

}
