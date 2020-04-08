import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaInicioComponent } from './pantalla-inicio.component';

describe('PantallaInicioComponent', () => {
  let component: PantallaInicioComponent;
  let fixture: ComponentFixture<PantallaInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
