import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTrabajadoresComponent } from './crear-trabajadores.component';

describe('CrearTrabajadoresComponent', () => {
  let component: CrearTrabajadoresComponent;
  let fixture: ComponentFixture<CrearTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTrabajadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
