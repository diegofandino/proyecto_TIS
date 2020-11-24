import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAvaobraComponent } from './registrar-avaobra.component';

describe('RegistrarAvaobraComponent', () => {
  let component: RegistrarAvaobraComponent;
  let fixture: ComponentFixture<RegistrarAvaobraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAvaobraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAvaobraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
