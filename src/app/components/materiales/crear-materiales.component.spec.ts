import { ComponentFixture, TestBed } from '@angular/core/testing';

import { crearMaterialesComponent} from './crear-materiales.component';

describe('CrearMaterialesComponent', () => {
  let component: crearMaterialesComponent;
  let fixture: ComponentFixture<crearMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ crearMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(crearMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
