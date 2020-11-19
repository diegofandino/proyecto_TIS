import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMaterialesComponent } from './crear-materiales.component';

describe('CrearMaterialesComponent', () => {
  let component: CrearMaterialesComponent;
  let fixture: ComponentFixture<CrearMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
