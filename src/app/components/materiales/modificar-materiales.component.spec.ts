import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMaterialesComponent } from './modificar-materiales.component';

describe('ModificarMaterialesComponent', () => {
  let component: ModificarMaterialesComponent;
  let fixture: ComponentFixture<ModificarMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
