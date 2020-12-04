import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasMaterialesComponent } from './salidas-materiales.component';

describe('SalidasMaterialesComponent', () => {
  let component: SalidasMaterialesComponent;
  let fixture: ComponentFixture<SalidasMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalidasMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidasMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
