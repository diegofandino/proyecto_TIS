import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAvanceobraComponent } from './registrar-avanceobra.component';

describe('RegistrarAvanceobraComponent', () => {
  let component: RegistrarAvanceobraComponent;
  let fixture: ComponentFixture<RegistrarAvanceobraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAvanceobraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAvanceobraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
