import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProveedoresComponent } from './modificar-proveedores.component';

describe('ModificarProveedoresComponent', () => {
  let component: ModificarProveedoresComponent;
  let fixture: ComponentFixture<ModificarProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarProveedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
