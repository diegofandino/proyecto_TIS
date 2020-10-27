import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTrabajadoresComponent } from './modificar-trabajadores.component';

describe('ModificarTrabajadoresComponent', () => {
  let component: ModificarTrabajadoresComponent;
  let fixture: ComponentFixture<ModificarTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarTrabajadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
