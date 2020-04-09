import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPrendaComponent } from './agregar-prenda.component';

describe('AgregarPrendaComponent', () => {
  let component: AgregarPrendaComponent;
  let fixture: ComponentFixture<AgregarPrendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPrendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPrendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
