import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvanceObraComponent } from './avance-obra.component';

describe('AvanceObraComponent', () => {
  let component: AvanceObraComponent;
  let fixture: ComponentFixture<AvanceObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvanceObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvanceObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
