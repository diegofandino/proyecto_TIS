import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceObraRepComponent } from './avance-obra-rep.component';

describe('AvanceObraRepComponent', () => {
  let component: AvanceObraRepComponent;
  let fixture: ComponentFixture<AvanceObraRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvanceObraRepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceObraRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
