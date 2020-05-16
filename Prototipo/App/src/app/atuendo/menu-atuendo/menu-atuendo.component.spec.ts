import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAtuendoComponent } from './menu-atuendo.component';

describe('MenuAtuendoComponent', () => {
  let component: MenuAtuendoComponent;
  let fixture: ComponentFixture<MenuAtuendoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAtuendoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAtuendoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
