import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasMaterialesComponent } from './entradas-materiales.component';

describe('EntradasMaterialesComponent', () => {
  let component: EntradasMaterialesComponent;
  let fixture: ComponentFixture<EntradasMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
