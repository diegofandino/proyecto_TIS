import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaavaobraComponent } from './listaavaobra.component';

describe('ListaavaobraComponent', () => {
  let component: ListaavaobraComponent;
  let fixture: ComponentFixture<ListaavaobraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaavaobraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaavaobraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
